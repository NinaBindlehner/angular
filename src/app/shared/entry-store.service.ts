import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Entry} from "./padlet";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class EntryStoreService {

  private api = 'http://padlet23.s2010456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Array<Entry>>{
    return this.http.get<Array<Entry>>(`${this.api}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle (id: string) : Observable<Entry> {
    return this.http.get<Entry>(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create (entry: Entry): Observable<any> {
    return this.http.post(`${this.api}/entries`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update (entry: Entry): Observable<any> {
    return this.http.put(`${this.api}/entries/${entry.id}`, entry) //id des aktuellen Entry-Objekts
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove (id: string): Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`) //id des aktuellen Entry-Objekts
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //behandelt Fehler vom Observable + schmeißt ihn zurück
  private errorHandler (error: Error | any) : Observable<any> {
    return throwError(error);
  }

}
