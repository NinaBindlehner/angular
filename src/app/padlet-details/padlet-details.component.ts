import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Padlet } from '../shared/padlet';

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent {

  //Input Componente PADLET registrieren
  @Input() padlet : Padlet | undefined //parameter padlet vom Typ Padlet oder undefined
  @Output() showListEvent = new EventEmitter<any>();

  showBookList() {
    this.showListEvent.emit();
  }

  getRating (num: number) { //zuvor noch in padlet-details.component.html Ratings irgendwie einführen (Zeile 26-31) -> is bei mir eigene Entität
    return new Array(num);
  }
}
