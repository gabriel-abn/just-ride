import type { User } from "@/domain/entities";

export interface IUserRepository {
  save(user: User): Promise<void>;
  get(filter?: Partial<{ id: string; email: string }>): Promise<User>;
}
