import React from 'react';
import { CommitGroup } from '../types';
import CommitCard from './CommitCard';

interface CommitTimelineProps {
  groups: CommitGroup[];
  loaded: boolean;
}
/* Renders commits grouped by date and card animations */
const CommitTimeline: React.FC<CommitTimelineProps> = ({ groups, loaded }) => {
  let globalIndex = 0;

  return (
    <div>
      {groups.map((group) => (
        <div key={group.date} style={{ marginBottom: 32 }}>
          {/* Date header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
            paddingBottom: 8,
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#2a2a2a',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 500,
              color: '#4a4a4a',
              letterSpacing: 0.5,
            }}>
              {group.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#2a2a2a',
            }}>
              {group.commits.length} commit{group.commits.length !== 1 ? 's' : ''}
            </span>
            <div style={{
              flex: 1,
              height: 1,
              background: '#1a1a1a',
            }} />
          </div>

          {/* Commits in this group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {group.commits.map((commit) => {
              const idx = globalIndex++;
              return (
                <CommitCard
                  key={commit.sha}
                  commit={commit}
                  index={idx}
                  loaded={loaded}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommitTimeline;
