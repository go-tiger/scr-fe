interface LiveBadgeProps {
  isLive: boolean;
}

export function LiveBadge({ isLive }: LiveBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${
        isLive ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300'
      }`}
    >
      {isLive && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
      {isLive ? 'LIVE' : 'OFFLINE'}
    </span>
  );
}
