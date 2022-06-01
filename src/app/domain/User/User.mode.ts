import { UUID } from '../Shared/valueObjects/Uuid.valueObject';
import { UserEmail } from './valueObject/UserEmail.valueObject';
import { UserName } from './valueObject/UserName.valueObject';
import { UserPassword } from './valueObject/UserPassword.valueObject';
import { UserRole, USER_ROLE } from './valueObject/UserRole.valueObject';
import { UserStatus, USER_STATUS } from './valueObject/UserStatus.valueObject';

export class User {
  public readonly uuid: UUID;
  public readonly name: UserName;
  public readonly email: UserEmail;
  public readonly password: UserPassword;

  private _role: UserRole;
  private _status: UserStatus;

  constructor(dto: UserDto) {
    this.uuid = new UUID(dto?.uuid);
    this.name = new UserName(dto?.name);
    this.email = new UserEmail(dto?.email);
    this.password = new UserPassword(dto?.password);
    this._role = new UserRole(dto?.role);
    this._status = new UserStatus(dto?.status);
  }

  get role(): UserRole {
    return this._role;
  }

  get status(): UserStatus {
    return this._status;
  }

  public toDto(): UserDto {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
      status: this.status.value,
    };
  }

  public toDtoWidthoutPassword(): Omit<UserDto, 'password'> {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      email: this.email.value,
      role: this.role.value,
      status: this.status.value,
    };
  }
}

export interface UserDto {
  uuid: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
  status: USER_STATUS;
}
