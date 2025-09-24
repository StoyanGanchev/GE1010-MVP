import type { Course, LearningPath, LearningPathNode, Profile } from './types';

const foundationsFirst = (catalog: Course[]): Course | undefined =>
  catalog.find((course) => course.track === 'foundations');

const sortByDifficulty = (courses: Course[]): Course[] =>
  [...courses].sort((a, b) => a.difficulty - b.difficulty);

const pickCourseForTrack = (
  track: Course['track'],
  catalog: Course[],
  excludedIds: Set<string>
): Course | undefined => {
  const candidates = sortByDifficulty(
    catalog.filter((course) => course.track === track && !excludedIds.has(course.id))
  );
  return candidates[0];
};

const pickAdvancedCourse = (
  track: Course['track'],
  catalog: Course[],
  excludedIds: Set<string>
): Course | undefined => {
  const candidates = sortByDifficulty(
    catalog.filter(
      (course) =>
        course.track === track &&
        !excludedIds.has(course.id) &&
        course.difficulty >= 2
    )
  );
  return candidates[0];
};

const buildNodes = (courses: Course[]): LearningPathNode[] =>
  courses.map((course, index) => ({
    courseId: course.id,
    order: index + 1,
    status: index === 0 ? 'available' : 'locked'
  }));

export const generatePath = (profile: Profile, catalog: Course[]): LearningPath => {
  const selectedCourses: Course[] = [];
  const takenIds = new Set<string>();

  const foundations = foundationsFirst(catalog);
  if (foundations) {
    selectedCourses.push(foundations);
    takenIds.add(foundations.id);
  }

  const interestToTrack: Partial<Record<Profile['interests'][number], Course['track']>> = {
    cv: 'cv',
    nlp: 'nlp',
    smart_cities: 'smart_cities',
    sustainability: 'sustainability',
    python: 'foundations',
    machine_learning: 'foundations',
    games_apps: 'cv'
  };

  const interests = profile.interests.slice(0, 2);
  interests.forEach((interest) => {
    const track = interestToTrack[interest];
    if (!track) {
      return;
    }
    const course = pickCourseForTrack(track, catalog, takenIds);
    if (course) {
      selectedCourses.push(course);
      takenIds.add(course.id);
    }
  });

  if (profile.experienceLevel === 'advanced') {
    const targetInterest = interests[0] ?? profile.interests[0];
    const targetTrack = targetInterest ? interestToTrack[targetInterest] : undefined;
    if (targetTrack) {
      const advancedCourse = pickAdvancedCourse(targetTrack, catalog, takenIds);
      if (advancedCourse) {
        selectedCourses.push(advancedCourse);
        takenIds.add(advancedCourse.id);
      }
    }
  }

  const nodes = buildNodes(selectedCourses);

  return {
    userId: profile.userId,
    nodes,
    nextCourseId: nodes.find((node) => node.status === 'available')?.courseId
  };
};

export const advanceOnView = (courseId: string, path: LearningPath): LearningPath => {
  const nodes = path.nodes
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((node) => ({ ...node }));

  const targetIndex = nodes.findIndex((node) => node.courseId === courseId);

  if (targetIndex === -1) {
    return { ...path };
  }

  if (nodes[targetIndex].status !== 'viewed') {
    nodes[targetIndex].status = 'viewed';
  }

  const nextLockedIndex = nodes.findIndex(
    (node, index) => index > targetIndex && node.status === 'locked'
  );

  if (nextLockedIndex !== -1) {
    nodes[nextLockedIndex].status = 'available';
  }

  const nextAvailable = nodes.find((node) => node.status === 'available');

  return {
    ...path,
    nodes,
    nextCourseId: nextAvailable?.courseId
  };
};
