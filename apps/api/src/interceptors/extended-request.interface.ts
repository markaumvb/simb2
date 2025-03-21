import { Request } from 'express';

export interface ExtendedRequest extends Request {
  pagination: {
    page: number;
    limit: number;
  };
}
