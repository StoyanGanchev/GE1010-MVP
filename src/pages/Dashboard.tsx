import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/components/UI/Card';
import { ProgressBar } from '@/components/UI/ProgressBar';
import { PageHeader } from '@/components/Layout/PageHeader';
import { EmptyState } from '@/components/UI/EmptyState';
import { BADGES } from '@/lib/badges';
import { loadCatalog } from '@/lib/content';
import { formatRelativeTime } from '@/lib/time';
import type { Course } from '@/lib/types';
import { useSession } from '@/App';

export const DashboardPage = (): JSX.Element => {
  const { state, activityLog } = useSession();
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<Course[]>([]);

  useEffect(() => {
    loadCatalog().then(setCatalog).catch((error) => {
      console.error('Failed to load catalog', error);
    });
  }, []);

  const courseById = useMemo(() => new Map(catalog.map((course) => [course.id, course])), [catalog]);

  const nextCourse = state.path?.nextCourseId ? courseById.get(state.path.nextCourseId) : undefined;
  const recentlyViewed = activityLog.slice(0, 5);
  const viewedCount = state.viewedCourses.length;
  const badgeCount = state.badges.length;
  const certificateEligible = viewedCount >= 3;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome${state.user ? `, ${state.user.name.split(' ')[0]}` : ''}`}
        subtitle="Track your personalised journey through the EduAI Future Lab."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-2 text-sm font-semibold text-accent-dark">
            <span className="h-2 w-2 rounded-full bg-accent-dark" />
            Active session
          </span>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Card
          eyebrow="Learning path"
          title={nextCourse ? nextCourse.title : 'All set'}
          actions={
            nextCourse ? (
              <button
                type="button"
                onClick={() => navigate(`/course/${nextCourse.id}`)}
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Open course
              </button>
            ) : null
          }
        >
          {nextCourse ? (
            <p className="text-sm text-slate-600">{nextCourse.description}</p>
          ) : (
            <p className="text-sm text-slate-600">
              You have explored all courses in your current path. Head to the Path tab to review them.
            </p>
          )}
        </Card>

        <Card eyebrow="Progress" title="Session milestone">
          <ProgressBar value={viewedCount} max={3} label="Courses previewed" />
          <p className="mt-3 text-xs text-slate-500">
            Preview any three courses to unlock your session certificate.
          </p>
        </Card>

        <Card
          eyebrow="Recognition"
          title="Badges earned"
          actions={
            <button
              type="button"
              onClick={() => navigate('/badges')}
              className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              View badges
            </button>
          }
        >
          <p className="text-sm text-slate-600">
            {badgeCount} of {BADGES.length} badges earned this session.
          </p>
        </Card>

        <Card
          eyebrow="Certificate"
          title={certificateEligible ? 'Ready to preview' : 'Preview locked'}
          actions={
            <button
              type="button"
              onClick={() => navigate('/certificate')}
              className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              View certificate
            </button>
          }
        >
          <p className="text-sm text-slate-600">
            {certificateEligible
              ? 'Your certificate preview is ready. Review and celebrate your progress.'
              : 'Preview three courses to unlock a session certificate preview.'}
          </p>
        </Card>
      </div>

      <Card eyebrow="Activity" title="Recent course previews">
        {recentlyViewed.length ? (
          <ul className="space-y-3">
            {recentlyViewed.map((activity) => (
              <li key={`${activity.courseId}-${activity.viewedAt}`} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">
                  {courseById.get(activity.courseId)?.title ?? activity.courseId}
                </p>
                <p className="mt-1 text-xs text-slate-500">Viewed {formatRelativeTime(activity.viewedAt)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No previews yet"
            description="Start with the Next Up card to explore your first course preview."
          />
        )}
      </Card>
    </div>
  );
};
