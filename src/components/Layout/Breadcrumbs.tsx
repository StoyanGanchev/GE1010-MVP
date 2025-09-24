import { Link, useMatches } from 'react-router-dom';

interface BreadcrumbHandle {
  breadcrumb: string;
  hideBreadcrumbs?: boolean;
}

export const Breadcrumbs = (): JSX.Element | null => {
  const matches = useMatches();
  const crumbs = matches.filter((match) => {
    const handle = match.handle as BreadcrumbHandle | undefined;
    if (!handle?.breadcrumb) {
      return false;
    }
    if (handle.hideBreadcrumbs) {
      return false;
    }
    return true;
  });

  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 text-sm text-slate-500 sm:px-6">
      {crumbs.map((match, index) => {
        const handle = match.handle as BreadcrumbHandle;
        const isLast = index === crumbs.length - 1;
        const to = match.pathname || '';
        return (
          <span key={to} className="flex items-center gap-2">
            {isLast ? (
              <span className="font-medium text-slate-700">{handle.breadcrumb}</span>
            ) : (
              <Link
                to={to}
                className="transition hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {handle.breadcrumb}
              </Link>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
};
