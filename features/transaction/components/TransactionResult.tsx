import { cn } from '../../shared/utils';

interface TransactionResultProps {
  result: {
    error?: string;
    hash?: string;
    success: boolean;
  } | null;
}

export function TransactionResult({ result }: TransactionResultProps) {
  if (!result) return null;

  return (
    <div
      className={cn(
        'rounded-xl p-3 text-sm',
        result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      )}
    >
      {result.success ? (
        <p>
          Transaction sent!
          <br />
          <span className="font-mono text-xs">Hash: {result.hash}</span>
        </p>
      ) : (
        <p>{result.error}</p>
      )}
    </div>
  );
}
