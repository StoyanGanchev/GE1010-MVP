import { Badge as BadgeChip } from '@/components/UI/Badge';
import type { Badge, UserBadge } from '@/lib/types';

const ruleLabels: Record<Badge['rule'], string> = {
  first_view: 'View your first course preview',
  foundations_viewed: 'Explore the AI Foundations course',
  three_courses_viewed: 'Preview three unique courses'
};

interface BadgeGridProps {
  catalog: Badge[];
  earned: UserBadge[];
  selectedId?: string;
  onSelect?: (badge: Badge) => void;
}

export const BadgeGrid = ({ catalog, earned, selectedId, onSelect }: BadgeGridProps): JSX.Element => {
  const earnedMap = new Map(earned.map((badge) => [badge.badgeId, badge]));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {catalog.map((badge) => {
        const awarded = earnedMap.get(badge.id);
        const isSelected = selectedId === badge.id;

        const handleSelect = () => {
          onSelect?.(badge);
        };

        return (
          <button
            key={badge.id}
            type="button"
            onClick={handleSelect}
            className={`group flex h-full flex-col rounded-2xl border px-5 py-5 text-left shadow-sm transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              awarded
                ? 'border-emerald-200 bg-emerald-50/80'
                : 'border-slate-200 bg-white'
            } ${isSelected ? 'ring-2 ring-brand shadow-lg shadow-brand/20' : 'hover:-translate-y-1 hover:shadow-lg'}`}
          >
            <div className="flex items-center justify-between">
              <BadgeChip tone={awarded ? 'success' : 'default'}>
                {awarded ? 'Earned' : 'Locked'}
              </BadgeChip>
              <span className="text-sm font-semibold text-slate-500 group-hover:text-brand-dark">
                {badge.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{badge.description}</p>
            {awarded ? (
              <p className="mt-4 text-xs font-medium text-emerald-700">
                Awarded {new Date(awarded.awardedAt).toLocaleString()}
              </p>
            ) : (
              <p className="mt-4 text-xs text-slate-400">
                Unlock by completing: {ruleLabels[badge.rule]}
              </p>
            )}
            <span
              className={`mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                isSelected
                  ? 'bg-brand/10 text-brand-dark'
                  : 'bg-slate-100 text-slate-500 group-hover:bg-brand/10 group-hover:text-brand-dark'
              }`}
            >
              {isSelected ? 'Viewing details' : 'Tap to view details'}
            </span>
          </button>
        );
      })}
    </div>
  );
};
