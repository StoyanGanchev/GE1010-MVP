import { useState } from 'react';

import type { Course } from '@/lib/types';

interface FinalPreviewProps {
  final: Course['checkpoints']['final'];
}

export const FinalPreview = ({ final }: FinalPreviewProps): JSX.Element => {
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const handleClick = () => {
    setAnnouncement('Final submissions will be enabled soon. Prepare your showcase in the meantime!');
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-slate-900">Final showcase</h3>
        <p className="mt-2 text-sm text-slate-600">{final.brief}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-800">Requirements</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {final.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-800">Rubric focus</h4>
        <p className="mt-2 text-sm text-slate-600">{final.rubricSummary}</p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Submit final preview
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
