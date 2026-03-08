/* Type definitions for dev log entries */

export interface DevLogEntry {
  id: string;
  date: string;
  title: string;
  summary: string;
  body: string[];
  tags: string[];
  category: 'decision' | 'problem' | 'learning' | 'milestone' | 'setup';
  lessonLearned?: string;
}
