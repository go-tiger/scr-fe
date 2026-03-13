'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Streamer } from '@/types/streamer';
import { PlatformBadge } from './PlatformBadge';
import { LiveBadge } from './LiveBadge';

interface StreamerCardProps {
  streamer: Streamer;
  onDelete?: (id: string) => void;
}

function formatViewerCount(count: number): string {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}만`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}천`;
  return count.toLocaleString();
}

export function StreamerCard({ streamer, onDelete }: StreamerCardProps) {
  const { id, name, profileImage, isLive, title, thumbnail, viewerCount, platform, category } = streamer;
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`${name}을(를) 삭제할까요?`)) return;
    setIsDeleting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/streamers/${id}`, { method: 'DELETE' });
      onDelete?.(id);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors group">
      {/* 썸네일 / 프로필 영역 */}
      <div className="relative aspect-video bg-gray-800 overflow-hidden">
        {isLive && thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${name} 라이브 썸네일`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {profileImage && (
              <Image
                src={profileImage}
                alt={`${name} 프로필`}
                fill
                className="object-cover blur-sm opacity-30"
                unoptimized
              />
            )}
            <div className="relative z-10 w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt={`${name} 프로필`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
          </div>
        )}

        {/* 뱃지 */}
        <div className="absolute top-2 left-2">
          <LiveBadge isLive={isLive} />
        </div>
        <div className="absolute top-2 right-2">
          <PlatformBadge platform={platform} />
        </div>

        {/* 시청자 수 */}
        {isLive && viewerCount !== undefined && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
            👁 {formatViewerCount(viewerCount)}
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {profileImage && (
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-gray-700">
              <Image
                src={profileImage}
                alt={name}
                width={28}
                height={28}
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <span className="font-semibold text-white text-sm truncate flex-1">{name}</span>
          {onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-400 disabled:opacity-30 text-xs px-1"
              title="삭제"
            >
              ✕
            </button>
          )}
        </div>

        {title && (
          <p className="text-gray-400 text-xs truncate leading-relaxed mt-1">{title}</p>
        )}
        {category && (
          <p className="text-gray-500 text-xs mt-1 truncate">{category}</p>
        )}
        {!isLive && (
          <p className="text-gray-600 text-xs mt-1">오프라인</p>
        )}
      </div>
    </div>
  );
}
