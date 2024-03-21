import { ApplicationError } from "@/application/common";
import type { IUserRepository } from "@/application/protocols/repositories";
import { User } from "@/domain/entities";
import { eq } from "drizzle-orm";
import postgres from "../database/relational/postgres";
import { userTable } from "../database/relational/schema";

class UserRepository implements IUserRepository {
  constructor(private readonly db = postgres) {}

  async get(
    filter?: Partial<{ id: string; email: string }> | undefined
  ): Promise<User> {
    let user: User;

    try {
      if (filter) {
        const { id, email } = filter;

        if (id) {
          const [result] = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.id, id));

          user = User.restore(result.id, {
            ...result,
            emailVerified: result.verified,
            createdAt: new Date(result.created_at),
            updatedAt: new Date(result.updated_at),
          });

          return user;
        }

        if (email) {
          const [result] = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));

          user = User.restore(result.id, {
            ...result,
            emailVerified: result.verified,
            createdAt: new Date(result.created_at),
            updatedAt: new Date(result.updated_at),
          });

          return user;
        }

        throw new Error("UserRepository.get: Invalid filter.");
      }

      throw new Error("UserRepository.get: No filter provided.");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async save(user: User): Promise<void> {
    try {
      const exists = await this.get({ email: user.props.email });

      if (exists) {
        throw new ApplicationError(
          "User already exists.",
          "EMAIL_ALREADY_IN_USE"
        );
      }

      await this.db.insert(userTable).values({
        id: user.id,
        name: user.props.name,
        email: user.props.email,
        username: user.props.username,
        password: user.props.password,
        verified: user.props.emailVerified,
        phone: user.props.phone,
        created_at: user.props.createdAt.toISOString(),
        updated_at: user.props.updatedAt.toISOString(),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default UserRepository;
