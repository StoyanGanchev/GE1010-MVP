import { OnboardingForm } from '@/components/Onboarding/OnboardingForm';
import { PageHeader } from '@/components/Layout/PageHeader';

export const OnboardingPage = (): JSX.Element => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="EduAI Future Lab — Welcome"
        subtitle="Mix and match your interests and goals to craft a personalised MVP journey."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-2 text-sm font-semibold text-accent-dark">
            <span aria-hidden>✨</span>
            Interactive mode
          </span>
        }
      />
      <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-white via-accent-light/60 to-white px-4 py-6 shadow-xl shadow-accent-light/50 sm:px-8 sm:py-8">
        <OnboardingForm />
      </div>
    </div>
  );
};
