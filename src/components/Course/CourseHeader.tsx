import { Badge } from '@/components/UI/Badge';
import type { Course } from '@/lib/types';

const TRACK_LABELS: Record<Course['track'], string> = {
  foundations: 'Foundations',
  cv: 'Computer Vision',
  nlp: 'Natural Language',
  smart_cities: 'Smart Cities',
  sustainability: 'Sustainability'
};

const renderDifficulty = (value: Course['difficulty']) => {
  const max = 5;
  return Array.from({ length: max }, (_, index) => (
    <span key={index} aria-hidden className={index < value ? 'text-brand' : 'text-slate-300'}>
      ●
    </span>
  ));
};

export const CourseHeader = ({ course }: { course: Course }): JSX.Element => {
  return (
    <header className="space-y-4 rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone="default">{TRACK_LABELS[course.track]}</Badge>
        <span className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium text-slate-700">Difficulty</span>
          <span className="flex items-center gap-1 font-semibold">{renderDifficulty(course.difficulty)}</span>
        </span>
      </div>
      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
          {course.title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">{course.description}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Expected outcomes</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {course.expectedOutcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>
    </header>
  );
};
