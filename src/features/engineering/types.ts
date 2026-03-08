/*
 * ADR — Architecture Decision Record
 */

export interface ADR {
  id: string;
  number: number;
  title: string;
  status: 'accepted' | 'proposed' | 'rejected' | 'superseded';
  date: string;
  context: string;
  decision: string;
  consequences: { positive: string[]; negative: string[] };
  tags: string[];
}

/*
 * TechItem
 *
 * Each item belongs to a category (frontend,
 * backend, infrastructure, testing, or tooling) so the
 * tech stack page can group and display them.
 */
export interface TechItem {
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'testing' | 'tooling';
  url?: string;
}

/*
 * The system architecture is visualised as stacked layers,
 * each representing a distinct concern (e.g. presentation,
 * data, build tooling). Each layer lists the components
 * it contains and has an accent colour for the diagram.
 */
export interface ArchitectureLayer {
  name: string;
  description: string;
  components: string[];
  color: string;
}