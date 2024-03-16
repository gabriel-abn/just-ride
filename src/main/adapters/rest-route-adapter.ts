import type { Controller, HttpRequest } from "@/presentation/common";

export default (controller: Controller<any>) =>
  async ({ body, query, params, headers, set }: any): Promise<any> => {
    set.headers["Content-Type"] = "application/json";

    try {
      const request: HttpRequest<any> = { body, query, params, headers };

      const result = await controller.handle(request);

      set.status = result.status;

      return JSON.stringify({ response: result.body });
    } catch (error: any) {
      set.status = 500;

      return JSON.stringify({ error: error.message });
    }
  };
