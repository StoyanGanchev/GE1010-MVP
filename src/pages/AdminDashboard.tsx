import { useState } from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components/Layout/PageHeader';
import { Card } from '@/components/UI/Card';

export const AdminDashboardPage = (): JSX.Element => {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin dashboard"
        subtitle="Monitor session activity and access educator tools for the MVP preview."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-2 text-sm font-semibold text-accent-dark">
            <span className="h-2 w-2 rounded-full bg-accent-dark" />
            Lab status: Live
          </span>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card
          eyebrow="Live session"
          title="Learner lineup"
          actions={
            <Link
              to="/admin/lineup"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              View lineup
            </Link>
          }
        >
          <p className="text-sm text-slate-600">
            Review the current session learner list, experience levels, and recent activity logs.
          </p>
        </Card>

        <Card
          eyebrow="Content"
          title="Seed validator"
          actions={
            <Link
              to="/admin/seed"
              className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Validate seeds
            </Link>
          }
        >
          <p className="text-sm text-slate-600">
            Load local JSON files to verify course structures before shipping updates to the lab.
          </p>
        </Card>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => setNotice('Analytics exports will unlock soon. Check back after the MVP!')}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Export session report
        </button>
        {notice ? (
          <span className="rounded-lg bg-brand/10 px-3 py-2 text-xs font-medium text-brand-dark">
            {notice}
          </span>
        ) : null}
      </div>
    </div>
  );
};
