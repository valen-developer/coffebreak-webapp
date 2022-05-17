export abstract class ImageRepository {
  abstract getDataUrlFromEntity(entity: string): Promise<string>;
}
