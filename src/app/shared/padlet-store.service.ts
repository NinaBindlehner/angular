import { Injectable } from '@angular/core';
import {Padlet, User} from "./padlet";

@Injectable({
  providedIn: 'root'
})
export class PadletStoreService {

  padlets : Padlet[];

  constructor() {this.padlets = [
    new Padlet(1,
      'Titel1',
      'Beschreibung Padlet1',
      true,1,
      /*[new Entry(1,'Entry1', 'Beschreibung Entry1', 1, 1),
        new Entry(2,'Entry2','Beschreibung Entry2', 1, 2),
        new Entry(3,'Entry3','Beschreibung Entry3', 1, 3),
        new Entry(4,'Entry4', 'Beschreibung Entry4', 1, 4)],*/
      [new User(1, 'Nina', 'Bindlehner', 'https://de.wikipedia.org/wiki/Hauskatze#/media/Datei:Hauskatze_langhaar.jpg', 'nina.bindi@test.at', 'passwortNina', 1, 1),
        new User(2, 'Max', 'Muster', 'BildMax', 'max.muster@test.at', 'passwortMax', 1, 0)]),
    new Padlet(2,
      'Titel2',
      'Beschreibung Padlet2',
      true,2,
      /*[new Entry(1,'Entry1', 'Beschreibung Entry1', 2, 2),
        new Entry(2,'Entry2','Beschreibung Entry2', 1, 2),
        new Entry(3,'Entry3','Beschreibung Entry3', 1, 3),
        new Entry(4,'Entry4', 'Beschreibung Entry4', 1, 4)],*/
      [new User(1, 'Nina', 'Bindlehner', 'https://de.wikipedia.org/wiki/Hauskatze#/media/Datei:Hauskatze_langhaar.jpg', 'nina.bindi@test.at', 'passwortNina', 1, 0),
        new User(2, 'Max', 'Muster', 'BildMax', 'max.muster@test.at', 'passwortMax', 1, 1),])
  ];

  }

  getAll() {
    return this.padlets;
  }

  getSingle (id: string) : Padlet {
    return <Padlet>this.padlets.find(padlet => padlet.id.toString() === id);
  }

}
