import { SignUpUseCase } from "@/application/use-cases/auth/sign-up-use-case";
import type { SignUp } from "@/domain/use-cases/auth";
import userRepository from "@/infra/persistence/repositories/user-repository";
import hasher from "@/infra/security/hasher";
import { SignUpController } from "@/presentation/controller/auth/sign-up-controller";

class SignUpFactory {
  private useCase: SignUp;
  private controller: SignUpController;

  constructor() {
    this.useCase = new SignUpUseCase(userRepository, hasher);
    this.controller = new SignUpController(this.useCase);
  }

  make() {
    return {
      useCase: this.useCase,
      controller: this.controller,
    };
  }
}

export default new SignUpFactory();
