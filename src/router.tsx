import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';

import { Breadcrumbs } from './components/Layout/Breadcrumbs';
import { Footer } from './components/Layout/Footer';
import { Navbar } from './components/Layout/Navbar';
import { AdminDashboardPage } from './pages/AdminDashboard';
import { AdminRosterPage } from './pages/AdminRoster';
import { AdminSeedPage } from './pages/AdminSeed';
import { BadgesPage } from './pages/Badges';
import { CertificatePage } from './pages/Certificate';
import { CoursePage } from './pages/Course';
import { DashboardPage } from './pages/Dashboard';
import { NotFoundPage } from './pages/NotFound';
import { OnboardingPage } from './pages/Onboarding';
import { PathPage } from './pages/Path';
import { WelcomePage } from './pages/Welcome';

const StudentLayout = (): JSX.Element => {
  const location = useLocation();
  const hideBreadcrumbs = location.pathname.startsWith('/onboarding');

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Path', to: '/path' },
    { label: 'Badges', to: '/badges' },
    { label: 'Certificate', to: '/certificate' }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar items={navItems} />
      {!hideBreadcrumbs ? <Breadcrumbs /> : null}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const AdminLayout = (): JSX.Element => {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Admin Dashboard', to: '/admin' },
    { label: 'Lineup', to: '/admin/lineup' },
    { label: 'Seed Preview', to: '/admin/seed' }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar items={navItems} />
      <Breadcrumbs />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const WelcomeLayout = (): JSX.Element => (
  <div className="flex min-h-screen flex-col bg-slate-50">
    <main className="mx-auto flex w-full max-w-4xl flex-1 items-center justify-center px-4 py-12 sm:px-6">
      <Outlet />
    </main>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomeLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
        handle: { breadcrumb: 'Welcome', hideBreadcrumbs: true }
      }
    ]
  },
  {
    path: '/',
    element: <StudentLayout />,
    handle: { breadcrumb: 'Home' },
    children: [
      {
        path: 'onboarding',
        element: <OnboardingPage />,
        handle: { breadcrumb: 'Onboarding', hideBreadcrumbs: true }
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        handle: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'path',
        element: <PathPage />,
        handle: { breadcrumb: 'Learning Path' }
      },
      {
        path: 'course/:courseId',
        element: <CoursePage />,
        handle: { breadcrumb: 'Course' }
      },
      {
        path: 'badges',
        element: <BadgesPage />,
        handle: { breadcrumb: 'Badges' }
      },
      {
        path: 'certificate',
        element: <CertificatePage />,
        handle: { breadcrumb: 'Certificate' }
      },
      {
        path: '*',
        element: <NotFoundPage />,
        handle: { breadcrumb: 'Not Found' }
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    handle: { breadcrumb: 'Admin' },
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
        handle: { breadcrumb: 'Admin Dashboard' }
      },
      {
        path: 'lineup',
        element: <AdminRosterPage />,
        handle: { breadcrumb: 'Lineup' }
      },
      {
        path: 'seed',
        element: <AdminSeedPage />,
        handle: { breadcrumb: 'Seed Preview' }
      },
      {
        path: '*',
        element: <NotFoundPage />,
        handle: { breadcrumb: 'Not Found' }
      }
    ]
  }
]);
