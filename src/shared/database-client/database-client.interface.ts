export interface DatabaseClient {
  connect(connectionString: string): Promise<void>;
  disconnect(): Promise<void>;
}
