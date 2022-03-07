export declare interface MyResponse<T = null> {
  message: string;
  data?: T;
  statusCode?: number;
  error?: string;
}
