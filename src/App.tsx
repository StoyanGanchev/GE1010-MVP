import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { advanceOnView } from './lib/pathEngine';
import {
  getActivityLog,
  getDefaultState,
  getState,
  recordActivity,
  resetState,
  setState
} from './lib/session';
import type { ActivityLogEntry, SessionState, UserBadge } from './lib/types';
import { router } from './router';

interface SessionContextValue {
  state: SessionState;
  activityLog: ActivityLogEntry[];
  setSessionState: (patch: Partial<SessionState>) => void;
  markCourseViewed: (courseId: string) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [session, setSession] = useState<SessionState>(getDefaultState());
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);

  useEffect(() => {
    setSession(getState());
    setActivityLog(getActivityLog());
  }, []);

  const setSessionState = useCallback((patch: Partial<SessionState>) => {
    const next = setState(patch);
    setSession(next);
  }, []);

  const resetSessionState = useCallback(() => {
    resetState();
    setSession(getDefaultState());
    setActivityLog([]);
  }, []);

  const markCourseViewed = useCallback(
    (courseId: string) => {
      setSession((current) => {
        const liveState = current.user ? current : getState();
        const alreadyViewed = liveState.viewedCourses.includes(courseId);
        const viewedCourses = alreadyViewed
          ? liveState.viewedCourses
          : [...liveState.viewedCourses, courseId];

        let badges: UserBadge[] = liveState.badges;
        const userId = liveState.user?.id;
        const now = new Date().toISOString();

        if (userId && !alreadyViewed) {
          const award = (badgeId: string) => {
            const hasBadge = badges.some(
              (badge) => badge.badgeId === badgeId && badge.userId === userId
            );
            if (!hasBadge) {
              badges = [...badges, { userId, badgeId, awardedAt: now }];
            }
          };

          award('first_view');
          if (courseId === 'foundations') {
            award('foundations_viewed');
          }
          if (viewedCourses.length >= 3) {
            award('three_courses_viewed');
          }
        }

        const updatedPath = liveState.path
          ? advanceOnView(courseId, liveState.path)
          : undefined;

        const nextState = setState({
          viewedCourses,
          badges,
          path: updatedPath ?? liveState.path
        });

        setActivityLog(recordActivity({ courseId, viewedAt: now }));

        return nextState;
      });
    },
    []
  );

  const value = useMemo<SessionContextValue>(
    () => ({
      state: session,
      activityLog,
      setSessionState,
      markCourseViewed,
      resetSession: resetSessionState
    }),
    [activityLog, markCourseViewed, resetSessionState, session, setSessionState]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const App = (): JSX.Element => {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
};

export default App;
