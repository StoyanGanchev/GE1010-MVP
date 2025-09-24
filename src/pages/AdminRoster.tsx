import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/Layout/PageHeader';
import { Badge as StatusBadge } from '@/components/UI/Badge';
import { Card } from '@/components/UI/Card';
import { Table, type TableColumn } from '@/components/UI/Table';
import { loadCatalog } from '@/lib/content';
import { formatRelativeTime } from '@/lib/time';
import { useSession } from '@/App';

interface AdminRow {
  name: string;
  nextCourse: string;
  viewedCount: number;
  needsAttention: boolean;
  lastActivity: string;
  level: string;
}

const mockStudents = [
  {
    name: 'Omar Khalid',
    nextCourseId: 'smart_cities_intro',
    viewedCount: 2,
    needsAttention: false,
    hoursAgo: 2,
    level: 'Intermediate'
  },
  {
    name: 'Latifa Al Noor',
    nextCourseId: 'cv_basics',
    viewedCount: 1,
    needsAttention: false,
    hoursAgo: 6,
    level: 'Beginner'
  },
  {
    name: 'Hassan Al Maktoum',
    nextCourseId: 'foundations',
    viewedCount: 0,
    needsAttention: true,
    hoursAgo: 24,
    level: 'Beginner'
  },
  {
    name: 'Maya Rahman',
    nextCourseId: 'sustainability_intro',
    viewedCount: 3,
    needsAttention: false,
    hoursAgo: 5,
    level: 'Advanced'
  },
  {
    name: 'Sara Qassim',
    nextCourseId: 'nlp_basics',
    viewedCount: 0,
    needsAttention: true,
    hoursAgo: 36,
    level: 'Intermediate'
  },
  {
    name: 'Aminah Al Farsi',
    nextCourseId: 'smart_cities_intro',
    viewedCount: 2,
    needsAttention: false,
    hoursAgo: 9,
    level: 'Intermediate'
  }
];

export const AdminRosterPage = (): JSX.Element => {
  const { state, activityLog } = useSession();
  const [rows, setRows] = useState<AdminRow[]>([]);

  useEffect(() => {
    loadCatalog()
      .then((catalog) => {
        const titleLookup = new Map(catalog.map((course) => [course.id, course.title]));

        const formatLevel = (level: string): string =>
          level
            .split('_')
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join(' ');

        const currentStudent: AdminRow | null = state.user
          ? {
              name: state.user.name,
              nextCourse: state.path?.nextCourseId
                ? titleLookup.get(state.path.nextCourseId) ?? 'Next up announced'
                : 'Completed path',
              viewedCount: state.viewedCourses.length,
              needsAttention: state.viewedCourses.length === 0,
              lastActivity:
                activityLog[0]?.viewedAt ?? state.createdAt ?? new Date().toISOString(),
              level: state.profile?.experienceLevel
                ? formatLevel(state.profile.experienceLevel)
                : 'Not set'
            }
          : null;

        const generatedMocks: AdminRow[] = mockStudents.map((student) => ({
          name: student.name,
          nextCourse: titleLookup.get(student.nextCourseId) ?? 'Path pending',
          viewedCount: student.viewedCount,
          needsAttention: student.needsAttention,
          lastActivity: new Date(Date.now() - student.hoursAgo * 60 * 60 * 1000).toISOString(),
          level: student.level
        }));

        setRows(currentStudent ? [currentStudent, ...generatedMocks] : generatedMocks);
      })
      .catch((error) => {
        console.error('Failed to build admin view', error);
      });
  }, [activityLog, state.createdAt, state.path?.nextCourseId, state.user, state.viewedCourses]);

  const columns: TableColumn<AdminRow>[] = [
    {
      header: 'Student',
      accessor: (row) => row.name,
      className: 'font-semibold text-slate-900'
    },
    {
      header: 'Level',
      accessor: (row) => row.level
    },
    {
      header: 'Next Course',
      accessor: (row) => row.nextCourse
    },
    {
      header: 'Viewed',
      accessor: (row) => row.viewedCount,
      className: 'text-center'
    },
    {
      header: 'Needs Attention',
      accessor: (row) => (
        <StatusBadge tone={row.needsAttention ? 'warning' : 'success'}>
          {row.needsAttention ? 'Yes' : 'No'}
        </StatusBadge>
      ),
      className: 'text-center'
    },
    {
      header: 'Last Activity',
      accessor: (row) => formatRelativeTime(row.lastActivity)
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin console"
        subtitle="Preview learner progress in read-only mode. Data refreshes when the session resets."
      />

      <Card eyebrow="Learners" title="Session lineup">
        <Table columns={columns} data={rows} emptyState="No learners to display" />
      </Card>
    </div>
  );
};
