import type { UseCase } from "@/domain/common";

export namespace SignUp {
  export type Params = {
    username: string;
    email: string;
    password: string;
  };

  export type Result = boolean;
}

export interface SignUp extends UseCase<SignUp.Params, SignUp.Result> {
  execute(params: SignUp.Params): Promise<SignUp.Result>;
}
