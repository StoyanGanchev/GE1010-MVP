import { useState } from 'react';

interface CertificatePreviewProps {
  studentName: string;
  issuedOn: string;
  verifyId: string;
  courses: string[];
}

export const CertificatePreview = ({
  studentName,
  issuedOn,
  verifyId,
  courses
}: CertificatePreviewProps): JSX.Element => {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-lg">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand">EduAI Future Lab</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-slate-900">
          Certificate of Exploration
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          This certifies that <span className="font-semibold text-slate-900">{studentName}</span> has
          previewed key experiences from the EduAI Future Lab pathways.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm text-slate-700">
        <h3 className="font-semibold text-slate-800">Courses explored</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>

      <footer className="flex flex-col gap-3 border-t border-dashed border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>Issued on: {new Date(issuedOn).toLocaleDateString()}</p>
          <p className="mt-1">Preview ID: {verifyId}</p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <button
            type="button"
            onClick={() => setNotice('Downloads will be available soon. Save this preview ID for later!')}
            className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Download preview (coming soon)
          </button>
          {notice ? (
            <span className="rounded-lg bg-brand/10 px-3 py-2 text-[11px] font-medium text-brand-dark">
              {notice}
            </span>
          ) : null}
        </div>
      </footer>
    </section>
  );
};
