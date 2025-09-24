import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/Layout/PageHeader';
import { EmptyState } from '@/components/UI/EmptyState';
import { PathOverview } from '@/components/Path/PathOverview';
import { loadCatalog } from '@/lib/content';
import type { Course } from '@/lib/types';
import { useSession } from '@/App';

export const PathPage = (): JSX.Element => {
  const { state } = useSession();
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<Course[]>([]);

  useEffect(() => {
    loadCatalog().then(setCatalog).catch((error) => {
      console.error('Unable to load catalog', error);
    });
  }, []);

  if (!state.path || !state.path.nodes.length) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Learning path"
          subtitle="Complete the onboarding questionnaire to generate a personalised pathway."
        />
        <EmptyState
          title="No path generated"
          description="Once you finish onboarding we will curate a sequence of courses tailored to your interests."
          action={
            <button
              type="button"
              onClick={() => navigate('/onboarding')}
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark"
            >
              Go to onboarding
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your curated path"
        subtitle="Preview each course in sequence to unlock the full experience."
      />
      <PathOverview
        nodes={state.path.nodes}
        catalog={catalog}
        onSelect={(courseId) => navigate(`/course/${courseId}`)}
      />
    </div>
  );
};
