import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "./padlet";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private api = 'http://padlet23.s2010456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //behandelt Fehler vom Observable + schmeißt ihn zurück
  private errorHandler (error: Error | any) : Observable<any> {
    return throwError(error);
  }
}
