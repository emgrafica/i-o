import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createHttpClient, type IoClient, type OrgEvent } from '@i-o/api';
import { createMockClient } from '@i-o/connector-mock';

/**
 * Picks the i-o API: a real server when VITE_IO_API_URL is set, otherwise the in-browser
 * sample organisation. Surfaces only ever talk to IoClient.
 */
function createClient(): IoClient {
  const url = import.meta.env.VITE_IO_API_URL as string | undefined;
  return url ? createHttpClient({ baseUrl: url }) : createMockClient();
}

const IoContext = createContext<IoClient | null>(null);

export function IoProvider({ children, client }: { children: ReactNode; client?: IoClient }) {
  const [value] = useState<IoClient>(() => client ?? createClient());
  return <IoContext.Provider value={value}>{children}</IoContext.Provider>;
}

export function useIo(): IoClient {
  const io = useContext(IoContext);
  if (!io) throw new Error('useIo() must be used inside <IoProvider>');
  return io;
}

export interface QueryState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  reload: () => void;
  /** Replace the data locally, e.g. with the result of a mutation. */
  set: (data: T) => void;
}

/**
 * Loads data from the i-o API and re-runs when `deps` change. Tiny on purpose: the
 * surfaces need loading/error/reload and nothing more yet.
 */
export function useQuery<T>(load: (io: IoClient) => Promise<T>, deps: unknown[] = []): QueryState<T> {
  const io = useIo();
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(undefined);
    loadRef.current(io)
      .then(result => { if (active) setData(result); })
      .catch((err: Error) => { if (active) setError(err); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [io, tick, ...deps]);

  const reload = useCallback(() => setTick(t => t + 1), []);
  return { data, error, loading, reload, set: setData };
}

/** Live events from the organism (outages, request updates, device signals). */
export function useLiveEvents(onEvent: (event: OrgEvent) => void) {
  const io = useIo();
  const handler = useRef(onEvent);
  handler.current = onEvent;
  useEffect(() => io.events.subscribe(event => handler.current(event)), [io]);
}
