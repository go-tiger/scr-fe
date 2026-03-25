import { Streamer } from '@/types/streamer';
import { StreamerCard } from './StreamerCard';

const COLS_CLASS: Record<number, string> = {
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6',
  7: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7',
};

interface StreamerGridProps {
  streamers: Streamer[];
  onDelete?: (id: string) => void;
  columns?: number;
}

export function StreamerGrid({ streamers, onDelete, columns = 4 }: StreamerGridProps) {
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

  const colsClass = COLS_CLASS[columns] ?? COLS_CLASS[4];

  return (
    <div className={`grid ${colsClass} gap-4`}>
      {sorted.map((streamer) => (
        <StreamerCard key={streamer.id} streamer={streamer} onDelete={onDelete} />
      ))}
    </div>
  );
}
