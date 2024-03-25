import { ApplicationError } from "@/application/common";
import type {
  IUserRepository,
  SaveVerificationCodeRepository,
} from "@/application/protocols/repositories";
import type { IHasher } from "@/application/protocols/security";
import { User } from "@/domain/entities";
import type { SignUp } from "@/domain/use-cases/auth";

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hasher: IHasher,
    private readonly codeRepo: SaveVerificationCodeRepository
  ) {}

  async execute(params: SignUp.Params): Promise<SignUp.Result> {
    const userExists = await this.userRepo.get({ email: params.email });

    if (userExists) {
      throw new ApplicationError(
        "User already exists.",
        "EMAIL_ALREADY_IN_USE"
      );
    }

    const hashedPassword = await this.hasher.hash(params.password);

    const user = User.create({
      username: params.username,
      email: params.email,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    const code = crypto.randomUUID().split("-")[0].toUpperCase();

    await this.codeRepo.save(user.props.email, code);

    return true;
  }
}
