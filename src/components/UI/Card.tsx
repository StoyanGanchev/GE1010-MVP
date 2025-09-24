import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export const Card = ({ title, eyebrow, actions, children, footer }: CardProps): JSX.Element => {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-lg shadow-accent-light/40">
      {(eyebrow || title || actions) && (
        <header className="flex items-start gap-2 border-b border-slate-200 bg-gradient-to-r from-accent-light/70 via-white to-white px-4 py-3 sm:px-6">
          <div className="flex-1">
            {eyebrow ? <p className="text-xs uppercase tracking-wide text-brand">{eyebrow}</p> : null}
            {title ? (
              <h2 className="mt-1 font-display text-lg font-semibold text-slate-900">
                {title}
              </h2>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      )}
      <div className="flex-1 px-4 py-5 sm:px-6">{children}</div>
      {footer ? <footer className="border-t border-slate-200 px-4 py-3 sm:px-6">{footer}</footer> : null}
    </section>
  );
};
