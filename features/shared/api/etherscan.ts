import 'server-only';
import axios from 'axios';

import { walletAddress } from '../config';

const BASE_URL = 'https://api-sepolia.etherscan.io/api';
const apiKey = process.env.ETHERSCAN_API_KEY;
const usdcContract = process.env.USDC_CONTRACT_ADDRESS;
const tokenHash = process.env.TOKEN_HASH;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 60_000;

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL });
}

async function etherscanGet<T>(params: Record<string, string>): Promise<T> {
  if (!apiKey) {
    throw new Error('ETHERSCAN_API_KEY is not set in environment variables');
  }

  const cacheKey = `${walletAddress}:${JSON.stringify(params)}`;
  const cached = getCached<T>(cacheKey);
  if (cached !== null) return cached;

  const { data } = await axios.get(BASE_URL, {
    params: { ...params, apikey: apiKey }
  });

  if (data.status === '0' && data.message === 'NOTOK') {
    throw new Error(`EtherScan API error: ${data.result}`);
  }

  setCache(cacheKey, data.result as T);
  return data.result as T;
}

export async function getEthBalance(
  address: string = walletAddress!
): Promise<string> {
  return etherscanGet<string>({
    action: 'balance',
    address,
    module: 'account',
    tag: 'latest'
  });
}

export async function getTokenBalance(
  contractAddress: string,
  address: string = walletAddress!
): Promise<string> {
  return etherscanGet<string>({
    action: 'tokenbalance',
    address,
    contractaddress: contractAddress,
    module: 'account',
    tag: 'latest'
  });
}

export async function getUsdcBalance(
  address: string = walletAddress!
): Promise<string> {
  if (!usdcContract) {
    throw new Error(
      'USDC_CONTRACT_ADDRESS is not set in environment variables'
    );
  }
  return getTokenBalance(usdcContract, address);
}

export async function getTrackedTokenBalance(
  address: string = walletAddress!
): Promise<string> {
  if (!tokenHash) {
    throw new Error('TOKEN_HASH is not set in environment variables');
  }
  return getTokenBalance(tokenHash, address);
}

export async function getEthPrice(): Promise<{
  ethbtc: string;
  ethusd: string;
}> {
  return etherscanGet({
    action: 'ethprice',
    module: 'stats'
  });
}

export interface TokenTransfer {
  blockNumber: string;
  contractAddress: string;
  from: string;
  gasUsed: string;
  hash: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  value: string;
}

export async function getTokenTransfers(
  address: string = walletAddress!,
  contractAddress?: string,
  startBlock = '0',
  endBlock = '99999999'
): Promise<TokenTransfer[]> {
  const params: Record<string, string> = {
    action: 'tokentx',
    address,
    endblock: endBlock,
    module: 'account',
    sort: 'asc',
    startblock: startBlock
  };
  if (contractAddress) {
    params.contractaddress = contractAddress;
  }
  const result = await etherscanGet<TokenTransfer[] | string>(params);
  return Array.isArray(result) ? result : [];
}

export interface EthTransaction {
  blockNumber: string;
  from: string;
  hash: string;
  timeStamp: string;
  to: string;
  value: string;
}

export async function getTransactionList(
  address: string = walletAddress!,
  sort = 'asc',
  page = '1',
  offset = '1'
): Promise<EthTransaction[]> {
  const result = await etherscanGet<EthTransaction[] | string>({
    action: 'txlist',
    address,
    module: 'account',
    offset,
    page,
    sort
  });
  return Array.isArray(result) ? result : [];
}
