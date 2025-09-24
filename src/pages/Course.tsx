import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CourseHeader } from '@/components/Course/CourseHeader';
import { FinalPreview } from '@/components/Course/FinalPreview';
import { LessonList } from '@/components/Course/LessonList';
import { PracticePreview } from '@/components/Course/PracticePreview';
import { PageHeader } from '@/components/Layout/PageHeader';
import { EmptyState } from '@/components/UI/EmptyState';
import { TabSwitch } from '@/components/UI/TabSwitch';
import { getCourseById, loadCatalog } from '@/lib/content';
import type { Course } from '@/lib/types';
import { useSession } from '@/App';

const tabs = [
  { id: 'lessons', label: 'Lessons' },
  { id: 'practice', label: 'Practice' },
  { id: 'final', label: 'Final' }
] as const;

type TabId = (typeof tabs)[number]['id'];

export const CoursePage = (): JSX.Element => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { state, markCourseViewed } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedTitles, setRelatedTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('lessons');

  useEffect(() => {
    if (!courseId) {
      return;
    }

    setLoading(true);
    getCourseById(courseId)
      .then((result) => {
        if (!result) {
          setCourse(null);
          return;
        }
        setCourse(result);
      })
      .catch((error) => {
        console.error('Failed to load course', error);
      })
      .finally(() => setLoading(false));

    loadCatalog()
      .then((catalog) => {
        const lookup = catalog.reduce<Record<string, string>>((acc, item) => {
          acc[item.id] = item.title;
          return acc;
        }, {});
        setRelatedTitles(lookup);
      })
      .catch((error) => console.error('Failed to prime titles', error));
  }, [courseId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Loading course" />
        <p className="text-sm text-slate-600">Fetching course preview...</p>
      </div>
    );
  }

  if (!course || !courseId) {
    return (
      <div className="space-y-6">
        <PageHeader title="Course not found" />
        <EmptyState
          title="We couldn't find that course"
          description="Return to your dashboard to continue exploring available previews."
          action={
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark"
            >
              Back to dashboard
            </button>
          }
        />
      </div>
    );
  }

  const isViewed = state.viewedCourses.includes(courseId);

  const handleMarkViewed = () => {
    if (!isViewed) {
      markCourseViewed(courseId);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course preview"
        subtitle={state.path?.nodes.find((node) => node.courseId === courseId)?.status === 'available'
          ? 'Explore the lessons and requirements before diving deeper.'
          : 'Review this course details at your own pace.'}
        actions={
          <button
            type="button"
            onClick={handleMarkViewed}
            disabled={isViewed}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              isViewed
                ? 'cursor-not-allowed bg-emerald-100 text-emerald-700'
                : 'bg-brand text-white hover:bg-brand-dark'
            }`}
          >
            {isViewed ? 'Viewed ✓' : 'Mark as viewed'}
          </button>
        }
      />

      <CourseHeader course={course} />

      <div className="space-y-4">
        <TabSwitch items={tabs} activeItem={activeTab} onChange={(value) => setActiveTab(value as TabId)} />

        {activeTab === 'lessons' ? (
          <LessonList lessons={course.checkpoints.lessons} />
        ) : null}

        {activeTab === 'practice' ? <PracticePreview practice={course.checkpoints.practice} /> : null}
        {activeTab === 'final' ? <FinalPreview final={course.checkpoints.final} /> : null}
      </div>

      <aside className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 sm:px-6">
        <h3 className="font-semibold text-slate-800">What to preview next</h3>
        <p className="mt-2">
          Unlocking courses happens automatically when you mark previews as viewed. Check your{' '}
          <button
            type="button"
            className="text-brand underline-offset-4 hover:underline"
            onClick={() => navigate('/path')}
          >
            path overview
          </button>{' '}
          for progress.
        </p>
        {state.path?.nextCourseId && state.path.nextCourseId !== courseId ? (
          <p className="mt-2">
            Next up: <strong>{relatedTitles[state.path.nextCourseId] ?? state.path.nextCourseId}</strong>
          </p>
        ) : null}
      </aside>
    </div>
  );
};
