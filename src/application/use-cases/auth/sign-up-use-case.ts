import type { IUserRepository } from "@/application/protocols/repositories";
import type { IHasher } from "@/application/protocols/security";
import { User } from "@/domain/entities";
import type { SignUp } from "@/domain/use-cases/auth";

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hasher: IHasher
  ) {}

  async execute(params: SignUp.Params): Promise<SignUp.Result> {
    const hashedPassword = await this.hasher.hash(params.password);

    const user = User.create({
      username: params.username,
      email: params.email,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    return true;
  }
}
