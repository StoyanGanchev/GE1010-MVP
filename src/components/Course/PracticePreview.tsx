import { useState } from 'react';

import type { Course } from '@/lib/types';

interface PracticePreviewProps {
  practice: Course['checkpoints']['practice'];
}

export const PracticePreview = ({ practice }: PracticePreviewProps): JSX.Element => {
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const handleClick = () => {
    setAnnouncement('Practice simulations will unlock soon. Explore the brief and hints meanwhile.');
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-slate-900">Practice challenge</h3>
        <p className="mt-2 text-sm text-slate-600">{practice.brief}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Missing pieces</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {practice.missingPieces.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Helpful hints</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {practice.hints.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-800">Rubric focus</h4>
        <p className="mt-2 text-sm text-slate-600">{practice.rubricSummary}</p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Launch practice preview
        </button>
        {announcement ? (
          <p className="rounded-xl bg-brand/10 px-4 py-3 text-sm text-brand-dark shadow-inner">
            {announcement}
          </p>
        ) : null}
      </div>
    </section>
  );
};
