import { useMemo, useState } from 'react';

import { BadgeGrid } from '@/components/Gamification/BadgeGrid';
import { PageHeader } from '@/components/Layout/PageHeader';
import { Card } from '@/components/UI/Card';
import { BADGES } from '@/lib/badges';
import { useSession } from '@/App';

export const BadgesPage = (): JSX.Element => {
  const { state } = useSession();
  const [activeBadgeId, setActiveBadgeId] = useState<string | undefined>(BADGES[0]?.id);

  const activeBadge = useMemo(
    () => BADGES.find((badge) => badge.id === activeBadgeId) ?? BADGES[0],
    [activeBadgeId]
  );

  const earnedMap = useMemo(
    () => new Map(state.badges.map((badge) => [badge.badgeId, badge])),
    [state.badges]
  );
  const activeAward = activeBadge ? earnedMap.get(activeBadge.id) : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Session badges"
        subtitle="Preview badges earned during this session. These reset when your tab closes."
      />
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card
          eyebrow="Interactive grid"
          title={`${state.badges.length} of ${BADGES.length} unlocked`}
        >
          <BadgeGrid
            catalog={BADGES}
            earned={state.badges}
            selectedId={activeBadge?.id}
            onSelect={(badge) => setActiveBadgeId(badge.id)}
          />
        </Card>

        <Card
          eyebrow="Badge spotlight"
          title={activeBadge?.name ?? 'Select a badge'}
        >
          {activeBadge ? (
            <div className="space-y-4 text-sm text-slate-600">
              <p>{activeBadge.description}</p>
              <div className="rounded-2xl bg-accent-light/50 px-4 py-3 text-accent-dark">
                <p className="text-xs font-semibold uppercase tracking-wide">How to unlock</p>
                <p className="mt-1 text-sm text-accent-dark/90">
                  {activeBadge.id === 'three_courses_viewed'
                    ? 'Preview any three unique courses during this lab session.'
                    : activeBadge.id === 'foundations_viewed'
                    ? 'Open the Future-Ready AI Foundations course preview.'
                    : 'Mark your first course as viewed to start your streak.'}
                </p>
              </div>
              {activeAward ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs text-emerald-800">
                  Earned {new Date(activeAward.awardedAt).toLocaleString()}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-xs text-slate-500">
                  Not yet unlocked. Check the instructions above to activate it.
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Select a badge from the grid to preview its details.</p>
          )}
        </Card>
      </div>
    </div>
  );
};
