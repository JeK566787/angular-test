import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, Observable } from 'rxjs';
import { TokenResponse } from './auth.interface';

let isRefreshing: boolean = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService: AuthService = inject(AuthService);
    const token: string | null = authService.token;

    if (!token) {
        return next(req); // Если токен отсутствует, просто продолжаем запрос
    }

    return next(addToken(req, token)).pipe(
        catchError(error => {
            if (error.status === 403 && !isRefreshing) {
                // Ошибка 403, запускаем обновление токена, если оно еще не выполняется
                return refreshAndProceed(authService, req, next);
            }
            return throwError(() => error); // Передаем ошибку дальше, если она не 403
        })
    );
};

// Функция для добавления токена в заголовки запроса
const addToken = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Функция для обновления токена и повторного выполнения запроса
const refreshAndProceed = (
    authService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    isRefreshing = true;
    return authService.refreshAuthToken().pipe(
        switchMap((res: TokenResponse): Observable<HttpEvent<any>> => {
            isRefreshing = false;
            authService.saveTokens(res); // Сохраняем новый токен
            return next(addToken(req, res.access_token)); // Повторяем запрос с новым токеном
        }),
        catchError(err => {
            isRefreshing = false; // Сброс состояния, если возникла ошибка
            authService.logout(); // Выход из системы при ошибке обновления токена
            return throwError(() => err);
        })
    );
};
