import type { IUserRepository } from "@/application/protocols/repositories";
import type { User } from "@/domain/entities";

class UserRepository implements IUserRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  async save(user: User): Promise<void> {
    try {
      this.users.push(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new UserRepository();
