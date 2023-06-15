import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";

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

  public setSesstionStorage (token: string) {
    console.log("Token speichern");
    //Token decoden
    console.log(jwt_decode(token));
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("Du hast dich erfolgreich ausgeloggt!");
  }

  public isLoggedIn() : boolean {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("Der JWT ist abgelaufen");
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }

  public isLoggedOut() : boolean {
    return !this.isLoggedIn();
  }

  public getIdOfCurrentUser() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }
}
