import { Streamer } from '@/types/streamer';
import { StreamerCard } from './StreamerCard';

interface StreamerGridProps {
  streamers: Streamer[];
}

export function StreamerGrid({ streamers }: StreamerGridProps) {
  const sorted = [...streamers].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    if (a.isLive && b.isLive) {
      return (b.viewerCount ?? 0) - (a.viewerCount ?? 0);
    }
    return 0;
  });

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <div className="text-5xl mb-4">📺</div>
        <p className="text-lg font-medium">등록된 스트리머가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sorted.map((streamer) => (
        <StreamerCard key={streamer.id} streamer={streamer} />
      ))}
    </div>
  );
}
