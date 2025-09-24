import { useState } from 'react';

import type { Lesson } from '@/lib/types';

interface LessonListProps {
  lessons: Lesson[];
}

export const LessonList = ({ lessons }: LessonListProps): JSX.Element => {
  const [activeLesson, setActiveLesson] = useState<string | null>(lessons[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => {
        const isOpen = activeLesson === lesson.id;
        return (
          <div key={lesson.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setActiveLesson(isOpen ? null : lesson.id)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left sm:px-6"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{lesson.title}</p>
                <p className="mt-1 text-xs text-slate-500">{lesson.durationMins} minutes</p>
              </div>
              <span className="text-slate-400">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? (
              <div className="border-t border-slate-200 px-4 py-4 text-sm text-slate-600 sm:px-6">
                {lesson.summary}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
