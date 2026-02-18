export interface GetWordsParams {
  page: number;
  limit: number;
}

export interface WordResponse {
  id: number;
  word: string;
  created_at: string;
}

export interface WordByIdResponse {
  id: number;
  word: string;
}
