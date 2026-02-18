export interface HistoryResponse {
  id: string;
  word: string;
  viewed_at: string;
}

export interface GetHistoryParams {
  page: number;
  limit: number;
}
