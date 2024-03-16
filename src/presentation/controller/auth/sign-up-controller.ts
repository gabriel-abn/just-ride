import type { SignUp } from "@/domain/use-cases/auth";
import { Controller, type HttpRequest } from "@/presentation/common";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least 8 characters, one letter, one number and one special character."
    ),
});

export type SignUpRequest = z.infer<typeof signUpSchema>;

export class SignUpController extends Controller<SignUpRequest> {
  constructor(private readonly useCase: SignUp) {
    super(signUpSchema);
  }

  async run(request: HttpRequest<SignUpRequest>) {
    const { username, email, password } = request.body;

    const result = await this.useCase.execute({ username, email, password });

    return {
      status: 200,
      body: {
        created: result,
      },
    };
  }
}
