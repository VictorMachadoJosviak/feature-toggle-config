export enum TtlType {
  SECONDS = 'SECONDS',
  MINUTES = 'MINUTES',
  HOURS = 'HOURS',
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS',
  PERMANENT = 'PERMANENT',
}

export type CacheOptions = {
  ttl: number;
  ttlType: TtlType;
};

export const ttlValues: Record<TtlType, number> = {
  [TtlType.PERMANENT]: 0,
  [TtlType.SECONDS]: 1000,
  [TtlType.MINUTES]: 60000,
  [TtlType.HOURS]: 3600000,
  [TtlType.DAYS]: 86400000,
  [TtlType.WEEKS]: 604800000,
  [TtlType.MONTHS]: 2592000000,
  [TtlType.YEARS]: 31536000000,
};
