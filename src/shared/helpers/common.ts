export function getRandomValue(lowBorder: number, highBorder: number, precision = 0): number {
  return +(Math.random() * (highBorder - lowBorder) + lowBorder).toFixed(precision);
}

export function getRandomItem<T>(collection: T[]): T {
  const idx = getRandomValue(0, collection.length - 1);
  return collection[idx];
}

export function getRandomItems<T>(collection: T[]): T[] {
  const low = getRandomValue(0, collection.length - 1);
  const high = low + getRandomValue(low, collection.length);
  return collection.slice(low, high);
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : '';
}

export function capitalize(str: string): string {
  if (str.length < 2) {
    return str.toUpperCase();
  }

  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
