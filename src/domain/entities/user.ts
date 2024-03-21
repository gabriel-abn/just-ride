import { Entity } from "@/domain/common";
import crypto from "crypto";

export type UserProps = {
  username: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends Entity<UserProps> {
  private constructor(id: string, props: UserProps) {
    super(id, props);
  }

  static restore(id: string, props: UserProps): User {
    return new User(id, props);
  }

  static create(params: {
    username: string;
    email: string;
    password: string;
  }): User {
    const id = crypto.randomUUID().split("-").join("").toUpperCase();

    return new User(id, {
      username: params.username,
      name: "",
      email: params.email,
      password: params.password,
      emailVerified: false,
      phone: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
