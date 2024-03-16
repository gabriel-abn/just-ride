export type HttpRequest<T = any> = {
  body: T;
  query: Record<string, string>;
  params: Record<string, string>;
  headers: Record<string, string>;
  [key: string]: any;
};

export type HttpResponse = {
  status: number;
  body: any;
};
