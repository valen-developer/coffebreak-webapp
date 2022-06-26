export const byteUnitsConverter = (
  params: ByteUnitsConverterParams
): number => {
  const { quantity, unit, targetUnit } = params;
  if (unit === targetUnit) return quantity;

  const normalizer: { [k in Unit]: number } = {
    Bits: 1,
    Bytes: 8,
    Kilobytes: 8 * 1024,
    MegaBytes: 8 * 1024 * 1024,
  };

  const normalizedQuantityBits = quantity / normalizer[unit];
  const normalizedQuantityTarget =
    normalizedQuantityBits / normalizer[targetUnit];

  return normalizedQuantityTarget;
};

export const stringInBytesConverter = (bytes: number): string => {
  if (bytes < 1000) {
    return `${bytes} Bytes`;
  }

  if (bytes < 1000000) {
    return `${(bytes / 1000).toFixed(2)} KB`;
  }

  if (bytes < 1000000000) {
    return `${(bytes / 1000000).toFixed(2)} MB`;
  }

  return `${(bytes / 1000000000).toFixed(2)} GB`;
};

type Unit = 'Bytes' | 'Bits' | 'Kilobytes' | 'MegaBytes';
export interface ByteUnitsConverterParams {
  quantity: number;
  unit: Unit;
  targetUnit: Unit;
}
