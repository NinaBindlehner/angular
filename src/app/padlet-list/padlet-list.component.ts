import {Component, EventEmitter, OnInit, Output} from '@angular/core';
//import {Padlet, Entry, User} from "../shared/padlet"; //wenn i das (statt Zeile 3) einkommentiere -> dann auch in in padlets.ts Zeile 13 Array Entries wieder einkommentieren + ev. in padlet-list-component.hmtl sofern Ausgabe klappt
import {Padlet, User} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  constructor(private bs: PadletStoreService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.bs.getAll().subscribe(res => this.padlets = res);
    this.toastr.success('Die Liste mit allen Padlet wurde erfolgreich geladen', 'Alles OK');
  }

}
