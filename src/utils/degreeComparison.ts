import type { DegreeSource } from './degreeSource';

export function addComparisonSlug(current: string[], slug: string) {
  if (current.includes(slug)) return { slugs: current, message: '' };
  if (current.length >= 2) {
    return {
      slugs: current,
      message: 'You can only compare two degrees at a time. Remove one to add another.',
    };
  }
  return { slugs: [...current, slug], message: '' };
}

export function buildComparisonPath(slugs: string[], source: DegreeSource): string | null {
  if (slugs.length !== 2 || !slugs[0] || !slugs[1] || slugs[0] === slugs[1]) return null;
  const params = new URLSearchParams({ first: slugs[0], second: slugs[1], from: source });
  return `/degrees/compare?${params.toString()}`;
}
