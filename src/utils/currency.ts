// Canonical Soul Land Currency System
// Ratio: 100 Bronze = 1 Copper, 100 Copper = 1 Silver, 100 Silver = 1 Gold
// 1 Gold = 100 Silver = 10,000 Copper = 1,000,000 Bronze

export interface SoulCurrencyBreakdown {
  gold: number;
  silver: number;
  copper: number;
  bronze: number;
}

export const BRONZE_PER_COPPER = 100;
export const BRONZE_PER_SILVER = 100 * 100; // 10,000
export const BRONZE_PER_GOLD = 100 * 100 * 100; // 1,000,000

/**
 * Converts total bronze coins into { gold, silver, copper, bronze }
 */
export function fromTotalBronze(totalBronze: number): SoulCurrencyBreakdown {
  const safeTotal = Math.max(0, Math.floor(totalBronze || 0));
  const gold = Math.floor(safeTotal / BRONZE_PER_GOLD);
  const remGold = safeTotal % BRONZE_PER_GOLD;

  const silver = Math.floor(remGold / BRONZE_PER_SILVER);
  const remSilver = remGold % BRONZE_PER_SILVER;

  const copper = Math.floor(remSilver / BRONZE_PER_COPPER);
  const bronze = remSilver % BRONZE_PER_COPPER;

  return { gold, silver, copper, bronze };
}

/**
 * Converts { gold, silver, copper, bronze } into total bronze
 */
export function toTotalBronze(breakdown: Partial<SoulCurrencyBreakdown>): number {
  const gold = (breakdown.gold || 0) * BRONZE_PER_GOLD;
  const silver = (breakdown.silver || 0) * BRONZE_PER_SILVER;
  const copper = (breakdown.copper || 0) * BRONZE_PER_COPPER;
  const bronze = breakdown.bronze || 0;
  return gold + silver + copper + bronze;
}

/**
 * Format currency nicely with colors/labels
 */
export function formatCurrencyString(totalBronze: number): string {
  const { gold, silver, copper, bronze } = fromTotalBronze(totalBronze);
  const parts: string[] = [];
  if (gold > 0) parts.push(`${gold.toLocaleString()} Gold (金币)`);
  if (silver > 0) parts.push(`${silver} Silver (银币)`);
  if (copper > 0) parts.push(`${copper} Copper (铜币)`);
  if (bronze > 0 || parts.length === 0) parts.push(`${bronze} Bronze (魂币)`);
  return parts.join(' · ');
}

/**
 * Display formatted compact string, e.g. "12G 45S 60C"
 */
export function formatCompactCurrency(totalBronze: number): string {
  const { gold, silver, copper, bronze } = fromTotalBronze(totalBronze);
  if (gold > 0) return `${gold.toLocaleString()}G ${silver}S`;
  if (silver > 0) return `${silver}S ${copper}C`;
  if (copper > 0) return `${copper}C ${bronze}B`;
  return `${bronze}B`;
}
