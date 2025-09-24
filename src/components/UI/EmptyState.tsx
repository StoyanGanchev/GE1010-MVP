import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      {icon ?? (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
          🌱
        </span>
      )}
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
};
