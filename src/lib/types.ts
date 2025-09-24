export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  school?: string;
  grade?: string;
  email?: string;
}

export interface Profile {
  userId: string;
  interests: (
    | 'cv'
    | 'nlp'
    | 'smart_cities'
    | 'sustainability'
    | 'python'
    | 'machine_learning'
    | 'games_apps'
  )[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  supportStyle: 'step_by_step' | 'hints_only' | 'independent';
  goals: (
    | 'learn_ai_basics'
    | 'build_projects'
    | 'compete_and_win'
    | 'get_certificates'
  )[];
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  durationMins: number;
}

export interface Course {
  id: string;
  title: string;
  track: 'foundations' | 'cv' | 'nlp' | 'smart_cities' | 'sustainability';
  description: string;
  checkpoints: {
    lessons: Lesson[];
    practice: {
      brief: string;
      missingPieces: string[];
      hints: string[];
      rubricSummary: string;
    };
    final: {
      brief: string;
      requirements: string[];
      rubricSummary: string;
    };
  };
  expectedOutcomes: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface LearningPathNode {
  courseId: string;
  order: number;
  status: 'locked' | 'available' | 'viewed';
}

export interface LearningPath {
  userId: string;
  nodes: LearningPathNode[];
  nextCourseId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  rule: 'first_view' | 'three_courses_viewed' | 'foundations_viewed';
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  awardedAt: string;
}

export interface SessionState {
  user?: User;
  profile?: Profile;
  path?: LearningPath;
  viewedCourses: string[];
  badges: UserBadge[];
  createdAt?: string;
}

export interface ActivityLogEntry {
  courseId: string;
  viewedAt: string;
}
