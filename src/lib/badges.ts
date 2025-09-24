import type { Badge } from './types';

export const BADGES: Badge[] = [
  {
    id: 'first_view',
    name: 'First Explorer',
    description: 'View your first course preview in the lab.',
    rule: 'first_view'
  },
  {
    id: 'foundations_viewed',
    name: 'Foundation Builder',
    description: 'Complete the AI Foundations course overview.',
    rule: 'foundations_viewed'
  },
  {
    id: 'three_courses_viewed',
    name: 'Path Pioneer',
    description: 'Preview three different courses in one session.',
    rule: 'three_courses_viewed'
  }
];
