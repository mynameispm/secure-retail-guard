import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface RealtimeConfig {
  table: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
  filter?: string;
}

export const useRealtime = ({ table, onInsert, onUpdate, onDelete, filter }: RealtimeConfig) => {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const channelName = `realtime:${table}${filter ? ':' + filter : ''}`;
    
    const newChannel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: table,
          filter: filter,
        },
        (payload) => {
          console.log('Real-time INSERT:', payload);
          if (onInsert) {
            onInsert(payload);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: table,
          filter: filter,
        },
        (payload) => {
          console.log('Real-time UPDATE:', payload);
          if (onUpdate) {
            onUpdate(payload);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: table,
          filter: filter,
        },
        (payload) => {
          console.log('Real-time DELETE:', payload);
          if (onDelete) {
            onDelete(payload);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to real-time updates for ${table}`);
        } else if (status === 'CHANNEL_ERROR') {
          console.error(`Error subscribing to ${table}:`, status);
          toast.error(`Failed to connect to real-time updates for ${table}`);
        }
      });

    setChannel(newChannel);

    return () => {
      if (newChannel) {
        supabase.removeChannel(newChannel);
      }
    };
  }, [table, filter, onInsert, onUpdate, onDelete]);

  return { channel };
};