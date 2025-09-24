import type { ActivityLogEntry, SessionState } from './types';

const SESSION_KEY = 'eduai_mvp_v1';

const defaultState: SessionState = {
  viewedCourses: [],
  badges: []
};

const isBrowser = typeof window !== 'undefined';

type ExtendedSessionState = SessionState & {
  activityLog?: ActivityLogEntry[];
};

const readStorage = (): ExtendedSessionState | null => {
  if (!isBrowser) {
    return null;
  }

  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ExtendedSessionState;
  } catch (error) {
    console.warn('Failed to parse session state, resetting.', error);
    window.sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
};

const writeStorage = (state: ExtendedSessionState): void => {
  if (!isBrowser) {
    return;
  }
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
};

const mergeState = (
  current: ExtendedSessionState,
  patch: Partial<SessionState>
): ExtendedSessionState => {
  const next: ExtendedSessionState = {
    ...current,
    ...patch,
    viewedCourses: patch.viewedCourses ?? current.viewedCourses ?? [],
    badges: patch.badges ?? current.badges ?? []
  };

  if (!next.createdAt) {
    next.createdAt = new Date().toISOString();
  }

  return next;
};

const ensureState = (): ExtendedSessionState => {
  const stored = readStorage();
  if (stored) {
    return {
      ...defaultState,
      ...stored,
      viewedCourses: stored.viewedCourses ?? [],
      badges: stored.badges ?? []
    };
  }

  return { ...defaultState };
};

export const getState = (): SessionState => {
  const state = ensureState();
  return {
    user: state.user,
    profile: state.profile,
    path: state.path,
    viewedCourses: state.viewedCourses ?? [],
    badges: state.badges ?? [],
    createdAt: state.createdAt
  };
};

export const setState = (patch: Partial<SessionState>): SessionState => {
  if (!isBrowser) {
    return { ...defaultState, ...patch } as SessionState;
  }

  const current = ensureState();
  const next = mergeState(current, patch);
  writeStorage(next);
  return getState();
};

export const resetState = (): void => {
  if (!isBrowser) {
    return;
  }
  window.sessionStorage.removeItem(SESSION_KEY);
};

export const getDefaultState = (): SessionState => ({ ...defaultState });

export const getActivityLog = (): ActivityLogEntry[] => {
  const state = ensureState();
  return state.activityLog ?? [];
};

export const recordActivity = (entry: ActivityLogEntry): ActivityLogEntry[] => {
  if (!isBrowser) {
    return [entry];
  }

  const current = ensureState();
  const existing = current.activityLog ?? [];
  const nextLog = [entry, ...existing.filter((item) => item.courseId !== entry.courseId)].slice(
    0,
    10
  );

  writeStorage({ ...current, activityLog: nextLog });
  return nextLog;
};
