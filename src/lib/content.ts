import type { Course } from './types';

const courseModules = import.meta.glob('../data/courses/*.json', { eager: true });

let cachedCatalog: Course[] | null = null;

const normaliseCourseList = (): Course[] => {
  const courses = Object.values(courseModules).map((module) => {
    const courseModule = module as { default: Course };
    return courseModule.default;
  });

  return courses.sort((a, b) => {
    if (a.track === b.track) {
      return a.title.localeCompare(b.title);
    }
    return a.track.localeCompare(b.track);
  });
};

export const loadCatalog = async (): Promise<Course[]> => {
  if (!cachedCatalog) {
    cachedCatalog = normaliseCourseList();
  }
  return cachedCatalog;
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
  const catalog = await loadCatalog();
  return catalog.find((course) => course.id === id);
};

export const listTracks = async (): Promise<{ id: string; name: string }[]> => {
  const module = await import('../data/tracks.json');
  return module.default as { id: string; name: string }[];
};
