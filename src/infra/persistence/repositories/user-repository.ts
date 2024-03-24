import type { IUserRepository } from "@/application/protocols/repositories";
import { User } from "@/domain/entities";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { userTable } from "../database/relational/schema";

class UserRepository implements IUserRepository {
  constructor(private readonly db: NodePgDatabase) {}

  async get(
    filter?: Partial<{ id: string; email: string }> | undefined
  ): Promise<User | null> {
    let user: User;

    try {
      if (filter) {
        const { id, email } = filter;

        if (id) {
          const [result] = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.id, id));

          if (result) {
            user = User.restore(result.id, {
              ...result,
              emailVerified: result.verified,
              createdAt: new Date(result.created_at),
              updatedAt: new Date(result.updated_at),
            });

            return user;
          }

          return null;
        }

        if (email) {
          const [result] = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));

          if (result) {
            user = User.restore(result.id, {
              ...result,
              emailVerified: result.verified,
              createdAt: new Date(result.created_at),
              updatedAt: new Date(result.updated_at),
            });

            return user;
          }

          return null;
        }
      }

      throw new Error("UserRepository.get: No filter provided.");
    } catch (error: any) {
      throw new Error(
        "UserRepository.get: " +
          `${error.name} - ${error.message} \n ${error.stack}`
      );
    }
  }

  async save(user: User): Promise<void> {
    try {
      const props = user.props;

      await this.db.insert(userTable).values({
        id: user.id,
        name: props.name,
        email: props.email,
        username: props.username,
        password: props.password,
        verified: props.emailVerified,
        phone: props.phone,
        created_at: props.createdAt.toISOString(),
        updated_at: props.updatedAt.toISOString(),
      });
    } catch (error: any) {
      throw new Error(
        "UserRepository.save: " +
          `${error.name} - ${error.message} \n ${error.stack}`
      );
    }
  }
}

export default UserRepository;
