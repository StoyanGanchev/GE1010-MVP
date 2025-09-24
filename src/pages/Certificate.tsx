import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CertificatePreview } from '@/components/Gamification/CertificatePreview';
import { PageHeader } from '@/components/Layout/PageHeader';
import { EmptyState } from '@/components/UI/EmptyState';
import { loadCatalog } from '@/lib/content';
import type { Course } from '@/lib/types';
import { useSession } from '@/App';

export const CertificatePage = (): JSX.Element => {
  const { state } = useSession();
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<Course[]>([]);
  const [verifyId] = useState(() => crypto.randomUUID?.() ?? `preview-${Date.now()}`);

  useEffect(() => {
    loadCatalog().then(setCatalog).catch((error) => {
      console.error('Failed to load catalog', error);
    });
  }, []);

  const courseTitles = useMemo(() => {
    const lookup = new Map(catalog.map((course) => [course.id, course.title]));
    return state.viewedCourses.map((courseId) => lookup.get(courseId) ?? courseId);
  }, [catalog, state.viewedCourses]);

  const eligible = state.viewedCourses.length >= 3;

  if (!eligible) {
    return (
      <div className="space-y-6">
        <PageHeader title="Certificate preview" />
        <EmptyState
          title="Preview not yet available"
          description="Explore at least three different courses to unlock a certificate preview for this session."
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificate preview"
        subtitle="Share a glimpse of your EduAI Future Lab progress. Downloading is disabled in this MVP."
      />
      <CertificatePreview
        studentName={state.user?.name ?? 'Student Explorer'}
        issuedOn={state.createdAt ?? new Date().toISOString()}
        verifyId={verifyId}
        courses={courseTitles}
      />
    </div>
  );
};
