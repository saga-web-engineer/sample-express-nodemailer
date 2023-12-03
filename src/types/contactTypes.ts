import type { Request } from 'express';

export interface RequestBody {
  name: string;
  message: string;
}

export type ContactRequestBody = Request<unknown, unknown, unknown, RequestBody>;
