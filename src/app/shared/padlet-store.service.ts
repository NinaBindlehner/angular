import { Injectable } from '@angular/core';
import {Padlet, User} from "./padlet";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PadletStoreService {

  private api = 'http://padlet23.s2010456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {

  }

  getAll() : Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle (id: string) : Observable<Padlet> {
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create (padlet: Padlet): Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update (padlet: Padlet): Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet) //id des aktuellen Padlet-Objekts
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove (id: string): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${id}`) //id des aktuellen Padlet-Objekts
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  //behandelt Fehler vom Observable + schmeißt ihn zurück
  private errorHandler (error: Error | any) : Observable<any> {
    return throwError(error);
  }

}
