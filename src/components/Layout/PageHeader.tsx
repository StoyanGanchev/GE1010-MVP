import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-gradient-to-r from-accent-light/70 via-white to-white px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-1 text-sm text-slate-600 sm:text-base">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
};
