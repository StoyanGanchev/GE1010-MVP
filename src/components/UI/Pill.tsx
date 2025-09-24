import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  tone?: 'default' | 'locked' | 'available' | 'viewed';
}

const toneClasses: Record<Required<PillProps>['tone'], string> = {
  default: 'bg-slate-100 text-slate-600',
  locked: 'bg-slate-100 text-slate-500',
  available: 'bg-accent-light text-accent-dark',
  viewed: 'bg-emerald-100 text-emerald-700'
};

export const Pill = ({ children, tone = 'default' }: PillProps): JSX.Element => (
  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
    {children}
  </span>
);
