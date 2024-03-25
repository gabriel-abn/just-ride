import type { Login } from "@/domain/use-cases/auth";
import {
  Controller,
  type HttpRequest,
  type HttpResponse,
} from "@/presentation/common";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, { message: "Invalid password format." }),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export class LoginController extends Controller<LoginRequest> {
  constructor(private readonly useCase: Login) {
    super(loginSchema);
  }

  async run(request: HttpRequest<LoginRequest>): Promise<HttpResponse> {
    const { email, password } = request.body;

    try {
      const token = await this.useCase.execute({ email, password });

      return {
        status: 200,
        body: {
          ...token,
        },
      };
    } catch (error: any) {
      if (
        error.name === "INVALID_PASSWORD" ||
        error.name === "EMAIL_NOT_FOUND"
      ) {
        return {
          status: 401,
          body: {
            error: error.name,
            message: error.message,
          },
        };
      }

      throw error;
    }
  }
}
