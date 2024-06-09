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

const MINUTES_IN_SECONDS = 60;
const HOURS_IN_SECONDS = MINUTES_IN_SECONDS * 60;
const DAYS_IN_SECONDS = HOURS_IN_SECONDS * 24;
const WEEKS_IN_SECONDS = DAYS_IN_SECONDS * 7;
const MONTHS_IN_SECONDS = DAYS_IN_SECONDS * 30;
const YEARS_IN_SECONDS = DAYS_IN_SECONDS * 365;

export const ttlValues: Record<TtlType, number> = {
  [TtlType.PERMANENT]: 0,
  [TtlType.SECONDS]: 1,
  [TtlType.MINUTES]: MINUTES_IN_SECONDS,
  [TtlType.HOURS]: HOURS_IN_SECONDS,
  [TtlType.DAYS]: DAYS_IN_SECONDS,
  [TtlType.WEEKS]: WEEKS_IN_SECONDS,
  [TtlType.MONTHS]: MONTHS_IN_SECONDS,
  [TtlType.YEARS]: YEARS_IN_SECONDS,
};
