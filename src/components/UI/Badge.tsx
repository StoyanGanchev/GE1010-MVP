import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'default' | 'success' | 'warning';
}

const toneClasses: Record<Required<BadgeProps>['tone'], string> = {
  default: 'bg-accent-light text-accent-dark',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700'
};

export const Badge = ({ children, tone = 'default' }: BadgeProps): JSX.Element => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
};
