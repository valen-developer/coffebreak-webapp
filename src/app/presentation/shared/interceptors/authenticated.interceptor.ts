import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { RouteToolService } from '../services/route-tool.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private routeTool: RouteToolService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.storageService.get('token');

    let newRequest = request;

    if (token) {
      newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(newRequest).pipe(
      catchError((err, caught) => {
        return throwError(() => err);
      })
    );
  }
}
