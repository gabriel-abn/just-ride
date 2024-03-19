import { ApplicationError } from "@/application/common";
import type { IUserRepository } from "@/application/protocols/repositories";
import type { User } from "@/domain/entities";

class UserRepository implements IUserRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  async save(user: User): Promise<void> {
    try {
      if (this.users.length >= 1) {
        this.users.find((u) => {
          if (u.props.email == user.props.email)
            throw new ApplicationError(
              "Email already in use.",
              "EMAIL_ALREADY_IN_USE"
            );
        });
      }

      this.users.push(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new UserRepository();
