interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
}

export const ProgressBar = ({ value, max = 100, label }: ProgressBarProps): JSX.Element => {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div>
      {label ? <p className="mb-2 text-sm text-slate-600">{label}</p> : null}
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-slate-500">{percentage}% complete</p>
    </div>
  );
};
