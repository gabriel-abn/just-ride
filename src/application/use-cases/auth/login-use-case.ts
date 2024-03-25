import { ApplicationError } from "@/application/common";
import type { IUserRepository } from "@/application/protocols/repositories";
import type {
  IEncrypter,
  IHashComparer,
} from "@/application/protocols/security";
import type { Login } from "@/domain/use-cases/auth";

export class LoginUseCase implements Login {
  constructor(
    private readonly repository: IUserRepository,
    private readonly comparer: IHashComparer,
    private readonly encrypter: IEncrypter
  ) {}

  async execute(params: Login.Params): Promise<Login.Result> {
    const user = await this.repository.get({ email: params.email });

    if (!user) {
      throw new ApplicationError(
        "No user found with this email.",
        "EMAIL_NOT_FOUND"
      );
    }

    const isPasswordValid = await this.comparer.compare(
      params.password,
      user.props.password
    );

    if (!isPasswordValid) {
      throw new ApplicationError("Invalid password.", "INVALID_PASSWORD");
    }

    const token = this.encrypter.encrypt({
      id: user.id,
      email: user.props.email,
    });

    return {
      accessToken: token,
      refreshToken: "",
    };
  }
}
