// pagination.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ExtendedRequest extends Request {
  pagination: PaginationParams;
}

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  excludedPaths: string[] = ['autenticacao/login', 'autenticacao/refresh'];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    const page = parseInt(request.query.page as string, 10) || 1;
    let limit = parseInt(request.query.limit as string, 10);

    if (isNaN(limit) || limit <= 0) {
      // Define um valor padrão caso o valor de 'limit' seja inválido
      limit = 10;
    }

    request.pagination = {
      page,
      limit,
    };

    const excluded = this.excludedPaths.some((path) =>
      request.url.includes(path),
    );

    if (excluded) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          page,
          limit,
        };
      }),
    );
  }
}
