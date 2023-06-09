import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Padlet } from '../shared/padlet';
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent {

  padlet : Padlet | undefined;

  constructor(
    private bs: PadletStoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params; //Array wo die verschiedenen Parameter der URL zur Verfügung stehen
    //Parameter rausholen
    this.padlet = this.bs.getSingle(params['id']);
  }

  getRating (num: number) { //zuvor noch in padlet-details.component.html Ratings irgendwie einführen (Zeile 26-31) -> is bei mir eigene Entität
    return new Array(num);
  }
}
