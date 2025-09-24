import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { generatePath } from '@/lib/pathEngine';
import { loadCatalog } from '@/lib/content';
import type { Profile, User } from '@/lib/types';
import { useSession } from '@/App';

const interestOptions = [
  { id: 'cv', label: 'Computer Vision', description: 'Traffic cameras, smart sensors, computer vision for safety.', icon: '📷' },
  { id: 'nlp', label: 'Language AI', description: 'Chatbots, translation, intent detection in Arabic & English.', icon: '🗣️' },
  { id: 'smart_cities', label: 'Smart Cities', description: 'IoT systems, dashboards, and future-ready city planning.', icon: '🌆' },
  { id: 'sustainability', label: 'Sustainability', description: 'Forecasting, energy innovation, climate positive ideas.', icon: '🌱' },
  { id: 'python', label: 'Python Builds', description: 'Automate routines and prototype apps with Python.', icon: '🐍' },
  { id: 'machine_learning', label: 'Machine Learning', description: 'Train models, tune data, and experiment with predictions.', icon: '🤖' },
  { id: 'games_apps', label: 'Games & Apps', description: 'Create playful experiences, competitions, and mobile labs.', icon: '🎮' }
] as const;

const experienceOptions: Profile['experienceLevel'][] = ['beginner', 'intermediate', 'advanced'];

const supportOptions: Profile['supportStyle'][] = ['step_by_step', 'hints_only', 'independent'];

const goalOptions = [
  {
    id: 'learn_ai_basics',
    label: 'Learn AI basics',
    description: 'Master the core concepts and vocabulary of AI.',
    icon: '📚'
  },
  {
    id: 'build_projects',
    label: 'Build projects',
    description: 'Prototype tools, dashboards, or creative AI experiences.',
    icon: '🛠️'
  },
  {
    id: 'compete_and_win',
    label: 'Compete & win',
    description: 'Level up for hackathons, pitch challenges, and Expo showcases.',
    icon: '🏆'
  },
  {
    id: 'get_certificates',
    label: 'Get certificates',
    description: 'Collect recognitions that highlight your AI journey.',
    icon: '📜'
  }
] as const;

interface FormState {
  name: string;
  school: string;
  grade: string;
  experienceLevel: Profile['experienceLevel'];
  supportStyle: Profile['supportStyle'];
  goals: Record<(typeof goalOptions)[number]['id'], boolean>;
  interests: Record<(typeof interestOptions)[number]['id'], boolean>;
}

const buildDefaultFormState = (): FormState => ({
  name: '',
  school: '',
  grade: '',
  experienceLevel: 'beginner',
  supportStyle: 'step_by_step',
  goals: goalOptions.reduce(
    (acc, option) => ({
      ...acc,
      [option.id]: option.id === 'learn_ai_basics'
    }),
    {} as FormState['goals']
  ),
  interests: {
    cv: false,
    nlp: false,
    smart_cities: false,
    sustainability: false,
    python: false,
    machine_learning: false,
    games_apps: false
  }
});

const interestKeyOrder = interestOptions.map((option) => option.id);
const goalKeyOrder = goalOptions.map((option) => option.id);

export const OnboardingForm = (): JSX.Element => {
  const [formState, setFormState] = useState<FormState>(() => buildDefaultFormState());
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setSessionState, resetSession } = useSession();

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const updateInterest = (id: (typeof interestOptions)[number]['id'], checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [id]: checked
      }
    }));
  };

  const updateGoal = (id: (typeof goalOptions)[number]['id'], checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        [id]: checked
      }
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.name.trim()) {
      setError('Please add your name to continue.');
      return;
    }

    const selectedInterests = interestKeyOrder.filter((key) => formState.interests[key]);
    if (!selectedInterests.length) {
      setError('Choose at least one area of interest.');
      return;
    }

    const selectedGoals = goalKeyOrder.filter((key) => formState.goals[key]);
    if (!selectedGoals.length) {
      setError('Pick at least one goal to personalise your experience.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const user: User = {
        id: crypto.randomUUID?.() ?? `user-${Date.now()}`,
        role: 'student',
        name: formState.name.trim(),
        school: formState.school.trim() || undefined,
        grade: formState.grade.trim() || undefined
      };

      const profile: Profile = {
        userId: user.id,
        interests: selectedInterests as Profile['interests'],
        experienceLevel: formState.experienceLevel,
        supportStyle: formState.supportStyle,
        goals: selectedGoals as Profile['goals']
      };

      const catalog = await loadCatalog();
      const path = generatePath(profile, catalog);

      resetSession();
      setSessionState({
        user,
        profile,
        path,
        viewedCourses: [],
        badges: []
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to set up session', err);
      setError('Something went wrong while starting your lab session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <section className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            placeholder="Aisha Al Falasi"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-slate-700">
              School (optional)
            </label>
            <input
              id="school"
              name="school"
              type="text"
              value={formState.school}
              onChange={(event) => updateField('school', event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="Dubai National School"
            />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-slate-700">
              Grade (optional)
            </label>
            <input
              id="grade"
              name="grade"
              type="text"
              value={formState.grade}
              onChange={(event) => updateField('grade', event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="Grade 11"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-700">Experience level</legend>
          <p className="mt-1 text-xs text-slate-500">
            Pick the option that best describes your comfort working with AI concepts.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {experienceOptions.map((option) => {
              const selected = formState.experienceLevel === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField('experienceLevel', option)}
                  className={`flex flex-col items-start rounded-xl border px-4 py-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    selected ? 'border-brand bg-brand/10 shadow' : 'border-slate-300 hover:border-brand/60'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="text-base font-semibold capitalize text-slate-900">
                    {option.replace('_', ' ')}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    {selected ? 'Current selection' : 'Tap to select'}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-700">Choose your interests</legend>
          <p className="mt-1 text-xs text-slate-500">
            These power your personalised path. Pick one or two focus areas.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {interestOptions.map((interest) => {
              const selected = formState.interests[interest.id];
              return (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => updateInterest(interest.id, !selected)}
                  className={`flex h-full flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    selected
                      ? 'border-brand bg-white shadow-lg shadow-brand/20'
                      : 'border-slate-200 bg-white/70 hover:border-brand/60 hover:shadow-sm'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="text-2xl" aria-hidden>
                    {interest.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{interest.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{interest.description}</p>
                  </div>
                  <span
                    className={`mt-auto inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                      selected ? 'bg-brand/10 text-brand-dark' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {selected ? 'Selected' : 'Tap to add'}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-700">How would you like support?</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {supportOptions.map((option) => {
              const selected = formState.supportStyle === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField('supportStyle', option)}
                  className={`flex flex-col items-start rounded-xl border px-4 py-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    selected ? 'border-brand bg-brand/10 shadow' : 'border-slate-300 hover:border-brand/60'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="text-base font-semibold capitalize text-slate-900">
                    {option.replace('_', ' ')}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    {selected ? 'You prefer this style' : 'Select support style'}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-700">What are your goals?</legend>
          <p className="mt-1 text-xs text-slate-500">
            Pick as many as you like. We&apos;ll tailor nudges and resources to match.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {goalOptions.map((goal) => {
              const selected = formState.goals[goal.id];
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => updateGoal(goal.id, !selected)}
                  className={`flex h-full flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    selected
                      ? 'border-accent bg-accent-light/60 shadow-lg shadow-accent-light/50'
                      : 'border-slate-200 bg-white/70 hover:border-accent/50 hover:shadow-sm'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="text-2xl" aria-hidden>
                    {goal.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{goal.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{goal.description}</p>
                  </div>
                  <span
                    className={`mt-auto inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                      selected ? 'bg-accent-dark text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {selected ? 'Added' : 'Tap to add'}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </section>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Setting up...' : 'Create my learning path'}
        </button>
        <button
          type="button"
          className="text-sm text-slate-500 underline-offset-4 hover:underline"
          onClick={() => {
            resetSession();
            setFormState(buildDefaultFormState());
          }}
        >
          Reset form
        </button>
      </div>
    </form>
  );
};
