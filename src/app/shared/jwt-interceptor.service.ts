import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        //Response behandeln
      }
    },
      (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.toastr.error("Username oder Passwort ist falsch", "Fehlerhafter Login");
            }
          }
    }));
  }
}
