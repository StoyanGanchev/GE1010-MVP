import { useNavigate } from 'react-router-dom';

import { useSession } from '@/App';

export const WelcomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useSession();

  const goStudent = () => {
    const destination = state.user ? '/dashboard' : '/onboarding';
    navigate(destination);
  };

  const goAdmin = () => {
    navigate('/admin');
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-accent/40 bg-gradient-to-b from-white via-accent-light/60 to-white px-6 py-16 text-center shadow-xl shadow-accent-light/50">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
          Welcome to EduAI Future Lab
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Choose how you would like to explore the MVP experience today.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={goStudent}
          className="min-w-[180px] rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Student experience
        </button>
        <button
          type="button"
          onClick={goAdmin}
          className="min-w-[180px] rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand shadow-xl transition hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Admin console
        </button>
      </div>
    </section>
  );
};
