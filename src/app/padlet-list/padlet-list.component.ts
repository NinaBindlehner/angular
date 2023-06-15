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
  padlets: Padlet[] = [];
  //public_padlets: Padlet[] = [];

  constructor(private bs: PadletStoreService, private toastr: ToastrService, public authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.bs.getAll().subscribe(res => this.padlets = res);
    //this.bs.getPublic().subscribe(res => this.public_padlets = res);
    this.toastr.success('Die Liste mit allen Padlets wurde erfolgreich geladen', 'Alles OK');
  }

}
