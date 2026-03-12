import { Platform } from '@/types/streamer';

interface PlatformBadgeProps {
  platform: Platform;
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const isChzzk = platform === 'chzzk';
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${
        isChzzk ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
      }`}
    >
      {isChzzk ? 'CHZZK' : 'SOOP'}
    </span>
  );
}
