import { ApplicationError } from "@/application/common";
import type { SafeParseError, ZodSchema } from "zod";
import type { HttpRequest, HttpResponse } from "./http";
export abstract class Controller<T = any> {
  abstract run(request: HttpRequest<T>): Promise<HttpResponse>;
  private schema: ZodSchema;

  constructor(schema: ZodSchema) {
    this.schema = schema;
  }

  async handle(request: HttpRequest<T>): Promise<HttpResponse> {
    try {
      const parsedBody = this.schema.safeParse(request.body);

      if (!parsedBody.success) {
        return {
          status: 400,
          body: {
            error: "INVALID_MISSING_PARAMS",
            message: formatZodError(parsedBody),
          },
        };
      }

      const response = await this.run({ ...request, body: parsedBody.data });

      return response;
    } catch (error: any) {
      if (error instanceof ApplicationError) {
        return {
          status: 400,
          body: {
            error: error.name,
            message: error.message,
          },
        };
      }

      return {
        status: 500,
        body: error.message,
      };
    }
  }
}

const formatZodError = (error: SafeParseError<any>) => {
  const formattedError = error.error.errors.map((err) => {
    return {
      field: err.path.join("."),
      message: err.message,
    };
  });

  return formattedError;
};
