import { Link } from 'react-router-dom';

import { PageHeader } from '@/components/Layout/PageHeader';
import { EmptyState } from '@/components/UI/EmptyState';
import { useSession } from '@/App';

export const NotFoundPage = (): JSX.Element => {
  const { state } = useSession();
  const target = state.user ? '/dashboard' : '/onboarding';

  return (
    <div className="space-y-6">
      <PageHeader title="Page not found" />
      <EmptyState
        title="This page is off the lab map"
        description="Use the button below to jump back into your journey."
        action={
          <Link
            to={target}
            className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark"
          >
            Return to {state.user ? 'dashboard' : 'onboarding'}
          </Link>
        }
      />
    </div>
  );
};
