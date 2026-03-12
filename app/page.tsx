'use client';

import { useState } from 'react';
import { useStreamers } from '@/hooks/useStreamers';
import { StreamerGrid } from '@/components/StreamerGrid';
import { AddStreamerModal } from '@/components/AddStreamerModal';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function Home() {
  const { streamers, isLoading, error, lastUpdated, refresh } = useStreamers();
  const [showAddModal, setShowAddModal] = useState(false);

  const liveCount = streamers.filter((s) => s.isLive).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight">
              📡 스트리밍 컨트롤룸
            </h1>
            {!isLoading && (
              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                {liveCount}명 방송 중
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-500">
              {isLoading && <span className="animate-pulse">불러오는 중...</span>}
              {error && <span className="text-red-400">오류: {error}</span>}
              {lastUpdated && !isLoading && (
                <span>마지막 갱신: {formatTime(lastUpdated)}</span>
              )}
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs bg-white text-gray-950 font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
            >
              + 추가
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 animate-pulse"
              >
                <div className="aspect-video bg-gray-800" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <StreamerGrid streamers={streamers} onDelete={refresh} />
        )}
      </main>

      {showAddModal && (
        <AddStreamerModal
          onClose={() => setShowAddModal(false)}
          onAdded={refresh}
        />
      )}
    </div>
  );
}
