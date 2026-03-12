'use client';

import { useState, useEffect, useCallback } from 'react';
import { Streamer } from '@/types/streamer';

interface UseStreamersResult {
  streamers: Streamer[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useStreamers(): UseStreamersResult {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStreamers = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/streamers');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Streamer[] = await res.json();
      setStreamers(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기 실패');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreamers();
    const interval = setInterval(fetchStreamers, 30000);
    return () => clearInterval(interval);
  }, [fetchStreamers]);

  return { streamers, isLoading, error, lastUpdated };
}
