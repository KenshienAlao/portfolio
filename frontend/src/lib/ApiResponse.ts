export type ApiResponse<TData = void, TMeta = void> = {
  data?: TData;
  success: boolean;
  message: string;
  results?: TData;
  meta?: TMeta;
};
