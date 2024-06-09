export const formatTTL = (ttlInSeconds: number): string => {
  const timeUnits = [
    { limit: 60, value: 'seconds' },
    { limit: 60, value: 'minutes' },
    { limit: 24, value: 'hours' },
    { limit: 7, value: 'days' },
    { limit: 4, value: 'weeks' },
    { limit: 12, value: 'months' },
    { limit: Infinity, value: 'years' },
  ];

  for (const unit of timeUnits) {
    if (ttlInSeconds > 0 && ttlInSeconds < unit.limit) {
      return `Expires in ${Math.floor(ttlInSeconds)} ${unit.value}`;
    }
    ttlInSeconds /= unit.limit;
  }

  return 'Permanent';
};
