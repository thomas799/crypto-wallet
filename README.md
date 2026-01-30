## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo mode

The application runs in demo mode without setting any environment variables.

## Environment variables (optional)

To work with real data, create `.env` follow to `.env.example`:

## Architecture Notes

**Withdraw:** Sends USDC from the server wallet to any specified address (fully functional).

**Deposit:** Performs a self-transfer to demonstrate transaction flow. In production, this would require MetaMask/WalletConnect integration for user wallet connection and client-side signing.