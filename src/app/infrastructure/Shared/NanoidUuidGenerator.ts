import { nanoid } from 'nanoid';

import { UUIDGenerator } from 'src/app/domain/Shared/interfaces/UuidGenerator';

export class NanoidUuidGenerator implements UUIDGenerator {
  public generate(): string {
    return nanoid();
  }
}
