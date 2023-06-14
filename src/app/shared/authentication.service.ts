import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api: string = "http://padlet23.s2010456003.student.kwmhgb.at/api/auth";

  constructor(private http:HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }
}
