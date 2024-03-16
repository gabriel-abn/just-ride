export interface RelationalDatabase {
  connect(): void;
  disconnect(): void;
  query(query: string, queryValues: any[]): Promise<any>;
  execute(query: string, queryValues: any[]): Promise<boolean>;
}
