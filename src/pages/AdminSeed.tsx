import { useState } from 'react';

import { PageHeader } from '@/components/Layout/PageHeader';
import { Card } from '@/components/UI/Card';
import { Table, type TableColumn } from '@/components/UI/Table';
import type { Course } from '@/lib/types';

interface ValidationResult {
  id: string;
  title: string;
  valid: boolean;
  message: string;
}

const requiredKeys: (keyof Course)[] = [
  'id',
  'title',
  'track',
  'description',
  'checkpoints',
  'expectedOutcomes',
  'difficulty'
];

const isLessonArray = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (lesson) =>
      lesson &&
      typeof lesson.id === 'string' &&
      typeof lesson.title === 'string' &&
      typeof lesson.summary === 'string' &&
      typeof lesson.durationMins === 'number'
  );

const validateCourse = (course: unknown): ValidationResult => {
  if (!course || typeof course !== 'object') {
    return {
      id: 'unknown',
      title: 'Unknown',
      valid: false,
      message: 'Course entry is not an object'
    };
  }

  const typedCourse = course as Course;
  for (const key of requiredKeys) {
    if (typedCourse[key] === undefined || typedCourse[key] === null) {
      return {
        id: typedCourse.id ?? 'unknown',
        title: typedCourse.title ?? 'Untitled',
        valid: false,
        message: `Missing required field: ${key}`
      };
    }
  }

  if (!isLessonArray(typedCourse.checkpoints.lessons)) {
    return {
      id: typedCourse.id,
      title: typedCourse.title,
      valid: false,
      message: 'Lessons must include id, title, summary, and durationMins.'
    };
  }

  if (!Array.isArray(typedCourse.expectedOutcomes) || !typedCourse.expectedOutcomes.length) {
    return {
      id: typedCourse.id,
      title: typedCourse.title,
      valid: false,
      message: 'Expected outcomes must be a non-empty array.'
    };
  }

  return {
    id: typedCourse.id,
    title: typedCourse.title,
    valid: true,
    message: 'Looks good.'
  };
};

export const AdminSeedPage = (): JSX.Element => {
  const [rows, setRows] = useState<ValidationResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setRows([]);
      setError(null);
      return;
    }

    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      if (!Array.isArray(payload)) {
        throw new Error('JSON should be an array of courses');
      }
      const results = payload.map((entry) => validateCourse(entry));
      setRows(results);
      setError(null);
      setNotice('Preview generated successfully. Saving or publishing is disabled in this MVP.');
    } catch (err) {
      console.error('Validation failed', err);
      setRows([]);
      setError('Could not parse or validate the provided JSON. Ensure it is an array of Course objects.');
      setNotice(null);
    }
  };

  const columns: TableColumn<ValidationResult>[] = [
    { header: 'ID', accessor: (row) => row.id },
    { header: 'Title', accessor: (row) => row.title },
    {
      header: 'Valid',
      accessor: (row) => (row.valid ? 'Yes' : 'No'),
      className: 'text-center'
    },
    { header: 'Message', accessor: (row) => row.message }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin seed preview"
        subtitle="Load a local JSON file to inspect course objects. Seeds are not persisted in this MVP."
      />

      <Card title="Upload course definitions">
        <p className="text-sm text-slate-600">
          Choose a <code className="rounded bg-slate-100 px-1">.json</code> file containing an array of Course
          objects. The validator checks for required fields only.
        </p>
        <input
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          className="mt-4 block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:shadow"
        />
        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
        {notice ? (
          <p className="mt-3 text-sm text-brand-dark">{notice}</p>
        ) : null}
      </Card>

      <Card title="Validation results">
        <Table
          columns={columns}
          data={rows}
          emptyState="Load a JSON file above to view validation results."
        />
      </Card>
    </div>
  );
};
