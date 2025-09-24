import { PathNode } from './PathNode';
import type { Course, LearningPathNode } from '@/lib/types';

interface PathOverviewProps {
  nodes: LearningPathNode[];
  catalog: Course[];
  onSelect: (courseId: string) => void;
}

export const PathOverview = ({ nodes, catalog, onSelect }: PathOverviewProps): JSX.Element => {
  const courseById = new Map(catalog.map((course) => [course.id, course]));

  return (
    <ul className="space-y-4">
      {nodes.map((node) => (
        <PathNode
          key={node.courseId}
          node={node}
          course={courseById.get(node.courseId)}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};
