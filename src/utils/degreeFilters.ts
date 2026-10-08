export function filterDegrees<T extends { category: string }>(degrees: T[], filter: string): T[] {
  return filter === 'All' ? degrees : degrees.filter((degree) => degree.category === filter);
}
