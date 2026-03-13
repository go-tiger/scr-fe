'use client';

import { useState } from 'react';
import { Platform } from '@/types/streamer';

interface AddStreamerModalProps {
  onClose: () => void;
  onAdded: () => void;
}

export function AddStreamerModal({ onClose, onAdded }: AddStreamerModalProps) {
  const [platform, setPlatform] = useState<Platform>('chzzk');
  const [channelId, setChannelId] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/streamers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, channelId: channelId.trim(), name: name.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `HTTP ${res.status}`);
      }
      onAdded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '등록 실패');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-bold text-white mb-5">스트리머 추가</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 플랫폼 */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">플랫폼</label>
            <div className="flex gap-2">
              {(['chzzk', 'soop'] as Platform[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    platform === p
                      ? p === 'chzzk'
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {p === 'chzzk' ? 'CHZZK' : 'SOOP'}
                </button>
              ))}
            </div>
          </div>

          {/* 채널 ID */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">채널 ID</label>
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder={platform === 'chzzk' ? 'chzzk.naver.com/채널ID' : 'sooplive.co.kr/채널ID'}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="스트리머 이름"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg text-sm font-medium border border-gray-700 text-gray-400 hover:border-gray-500 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 rounded-lg text-sm font-semibold bg-white text-gray-950 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? '등록 중...' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
