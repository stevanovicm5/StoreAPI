import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { catchError, from, switchMap, throwError } from "rxjs";

const REFRESH_RETRY_HEADER = "x-refresh-retried";

export const authInterceptor : HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    // Avoid refresh recursion for auth endpoints and requests that already retried once.
    if (isAuthRequest(req) || req.headers.has(REFRESH_RETRY_HEADER)) {
        return next(req);
    }

    const authReq = addToken(req, authService.getAccessToken());

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                return from(authService.refreshToken()).pipe(
                    switchMap((success) => {
                        if (success) {
                            const retryReq = req.clone({
                                headers: req.headers.set(REFRESH_RETRY_HEADER, "true")
                            });
                            return next(addToken(retryReq, authService.getAccessToken()));
                        }
                        void authService.logout();
                        return throwError(() => error);
                    })
                );
            }
            return throwError(() => error);

        })
    );
};

function addToken (req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
    if (!token) return req;

    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    });
}

function isAuthRequest(req: HttpRequest<unknown>): boolean {
    return req.url.includes('/api/auth/');
}