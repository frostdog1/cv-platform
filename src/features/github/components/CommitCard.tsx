import React, { useState } from 'react';
import { GitHubCommit } from '../types';
import { getCommitType } from '../hooks/useGitHubData';

interface CommitCardProps {
  commit: GitHubCommit;
  index: number;
  loaded: boolean;
}

// Reusable card that will show each individual commit and information
const CommitCard: React.FC<CommitCardProps> = ({ commit, index, loaded }) => {
  const [hovered, setHovered] = useState(false);
  const { type, color, icon } = getCommitType(commit.message);

  const timeStr = new Date(commit.date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 14,
        padding: '14px 16px',
        borderRadius: 8,
        border: `1px solid ${hovered ? '#2a2a2a' : '#1a1a1a'}`,
        background: hovered ? '#131313' : '#0e0e0e',
        transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${0.1 + index * 0.04}s`,
        cursor: 'pointer',
      }}
      onClick={() => window.open(commit.url, '_blank')}
    >
      {/* Type indicator */}
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        background: `${color}12`,
        border: `1px solid ${color}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        flexShrink: 0,
        marginTop: 2,
      }}>
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Message */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          fontWeight: 500,
          color: '#d0d0d0',
          lineHeight: 1.5,
          marginBottom: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {commit.message}
        </div>

        {/* Description (in event of a multi-line commit) */}
        {commit.description && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: '#5a5a5a',
            lineHeight: 1.6,
            marginBottom: 6,
            whiteSpace: 'pre-wrap',
            maxHeight: 60,
            overflow: 'hidden',
          }}>
            {commit.description}
          </div>
        )}

        {/* Meta row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
        }}>
          {/* Commit type badge */}
          <span style={{
            padding: '2px 8px',
            borderRadius: 3,
            background: `${color}15`,
            color,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            {type}
          </span>

          {/* SHA */}
          <span style={{ color: '#3a3a3a' }}>
            {commit.shortSha}
          </span>

          {/* Time */}
          <span style={{ color: '#2a2a2a' }}>
            {timeStr}
          </span>

          {/* Author */}
          <span style={{ color: '#2a2a2a' }}>
            {commit.author}
          </span>
        </div>
      </div>

      {/* External link arrow */}
      <div style={{
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
        transition: 'all 0.2s',
        color: '#3a3a3a',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        ↗
      </div>
    </div>
  );
};

export default CommitCard;
