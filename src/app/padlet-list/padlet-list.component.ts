import { Component, OnInit } from '@angular/core';
//import {Padlet, Entry, User} from "../shared/padlet"; //wenn i das (statt Zeile 3) einkommentiere -> dann auch in in padlets.ts Zeile 13 Array Entries wieder einkommentieren + ev. in padlet-list-component.hmtl sofern Ausgabe klappt
import {Padlet, User} from "../shared/padlet";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  ngOnInit(): void {
    this.padlets = [
    new Padlet(1,
      'Titel 1',
      'Beschreibung Padlet1',
      true,1,
      /*[new Entry(1,'Entry1', 'Beschreibung Entry1', 1, 1),
        new Entry(2,'Entry2','Beschreibung Entry2', 1, 2),
        new Entry(3,'Entry3','Beschreibung Entry3', 1, 3),
        new Entry(4,'Entry4', 'Beschreibung Entry4', 1, 4)],*/
      [new User(1, 'Nina', 'Bindlehner', 'BildNina', 'nina.bindi@test.at', 'passwortNina', 1, 1),
      new User(2, 'Max', 'Muster', 'BildMax', 'max.muster@test.at', 'passwortMax', 1, 0)]),
    new Padlet(2,
      'Titel 2',
      'Beschreibung Padlet2',
      true,2,
      /*[new Entry(1,'Entry1', 'Beschreibung Entry1', 2, 2),
        new Entry(2,'Entry2','Beschreibung Entry2', 1, 2),
        new Entry(3,'Entry3','Beschreibung Entry3', 1, 3),
        new Entry(4,'Entry4', 'Beschreibung Entry4', 1, 4)],*/
      [new User(1, 'Nina', 'Bindlehner', 'BildNina', 'nina.bindi@test.at', 'passwortNina', 1, 0),
        new User(2, 'Max', 'Muster', 'BildMax', 'max.muster@test.at', 'passwortMax', 1, 1),])
    ];

    console.log(this.padlets);
  }
}
