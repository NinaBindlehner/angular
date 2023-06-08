import { Component, OnInit, Input } from '@angular/core';
import {Padlet} from "../shared/padlet";

@Component({
  selector: 'a.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent implements OnInit {

  //Input Componente PADLET registrieren
  @Input() padlet : Padlet | undefined //parameter padlet vom Typ Padlet oder undefined

    ngOnInit(): void {

    }

}
