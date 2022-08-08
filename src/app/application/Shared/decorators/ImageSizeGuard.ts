import {
  byteUnitsConverter,
  stringInBytesConverter,
} from 'src/app/helpers/byteUnitsConverter';

export const ImageSizeGuard = () => {
  const IMAGE_SIZE_LIMIT = 2 * 1000 * 1000;
  const bytes = byteUnitsConverter({
    quantity: IMAGE_SIZE_LIMIT,
    unit: 'Bytes',
    targetUnit: 'Bytes',
  });

  const message = stringInBytesConverter(bytes);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // the target method receive a image params which is a File object. We need to check if the image size is less than the max size allowed.
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const object: { image?: File } = args[0];
      const image = object.image;

      if (!image) return originalMethod.apply(this, args);

      if (image.size > IMAGE_SIZE_LIMIT) {
        throw new Error(`La imagen debe ser menor a ${message}`);
      }

      return originalMethod.apply(this, args);
    };
  };
};
