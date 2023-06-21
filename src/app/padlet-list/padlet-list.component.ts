import {Component, EventEmitter, OnInit, Output} from '@angular/core';
//import {Padlet, Entry, User} from "../shared/padlet"; //wenn i das (statt Zeile 3) einkommentiere -> dann auch in in padlets.ts Zeile 13 Array Entries wieder einkommentieren + ev. in padlet-list-component.hmtl sofern Ausgabe klappt
import {Padlet, User, Entry} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  all_padlets: Padlet[] = [];
  personal_padlets: Padlet [] = [];

  constructor(private bs: PadletStoreService, private toastr: ToastrService, public authService: AuthenticationService) {

  }

  ngOnInit():void {
    const userId = this.authService.getIdOfCurrentUser();

    //an Observable subscriben, wenn es ein result gibt, dem padlet array zuweisen
    this.bs.getAll().subscribe(padlets => {
      // Filtere die Padlets nach user_id
      this.personal_padlets = padlets.filter(padlet => padlet.user_id === Number(userId)); //Number = UserId vom Token
    });

    //an Observable subscriben, wenn es ein result gibt, dem padlet array zuweisen
    this.bs.getAll().subscribe(padlets => {
      if(this.authService.isLoggedIn()){
        this.all_padlets = padlets.filter(padlet => padlet.user_id !== Number(userId)
          //entweder public oder sonst jene wo angemeldeter User eingeladen wurde
          && (padlet.is_public || padlet.users?.some(user => user.id === Number(userId))));
      }

      else{
        //nicht eingeloggte User sehen nur öffentliche Padlets
        this.all_padlets = padlets.filter(padlet => padlet.user_id !== Number(userId) && padlet.is_public);
      }
    });
  }

}
