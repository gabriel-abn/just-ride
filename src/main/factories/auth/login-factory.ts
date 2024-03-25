import { LoginUseCase } from "@/application/use-cases/auth/login-use-case";
import type { Login } from "@/domain/use-cases/auth";
import db from "@/infra/persistence/database/relational/postgres";
import UserRepository from "@/infra/persistence/repositories/user-repository";
import hasher from "@/infra/security/hasher";
import jwtAdapter from "@/infra/security/jwt-adapter";
import { LoginController } from "@/presentation/controller/auth";

class LoginFactory {
  private useCase: Login;
  private controller: LoginController;

  constructor() {
    this.useCase = new LoginUseCase(new UserRepository(db), hasher, jwtAdapter);
    this.controller = new LoginController(this.useCase);
  }

  make() {
    return {
      useCase: this.useCase,
      controller: this.controller,
    };
  }
}

export default new LoginFactory();
