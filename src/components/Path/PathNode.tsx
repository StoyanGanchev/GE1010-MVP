import { Pill } from '@/components/UI/Pill';
import type { Course, LearningPathNode } from '@/lib/types';

interface PathNodeProps {
  node: LearningPathNode;
  course: Course | undefined;
  onSelect: (courseId: string) => void;
}

const statusCopy: Record<LearningPathNode['status'], { label: string; tone: Parameters<typeof Pill>[0]['tone'] }> = {
  available: { label: 'Available', tone: 'available' },
  viewed: { label: 'Viewed', tone: 'viewed' },
  locked: { label: 'Locked', tone: 'locked' }
};

export const PathNode = ({ node, course, onSelect }: PathNodeProps): JSX.Element => {
  const status = statusCopy[node.status];
  const isInteractive = node.status !== 'locked' && Boolean(course);

  return (
    <li className="flex items-stretch gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
        {node.order}
      </div>
      <button
        type="button"
        onClick={() => (isInteractive ? onSelect(node.courseId) : undefined)}
        disabled={!isInteractive}
        className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-brand/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:border-dashed disabled:text-slate-400"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {course ? course.title : 'Course unavailable'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {course ? course.description : 'Content coming soon.'}
            </p>
          </div>
          <Pill tone={status.tone}>{status.label}</Pill>
        </div>
      </button>
    </li>
  );
};
