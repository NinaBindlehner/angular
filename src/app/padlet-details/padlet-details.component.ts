import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Padlet } from '../shared/padlet';
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent {

  padlet : Padlet = PadletFactory.empty();

  constructor(
    private bs: PadletStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params; //Array wo die verschiedenen Parameter der URL zur Verfügung stehen
    this.bs.getSingle(params['id']).subscribe((p:Padlet) => this.padlet = p);
  }

  getRating (num: number) { //zuvor noch in padlet-details.component.html Ratings irgendwie einführen (Zeile 26-31) -> is bei mir eigene Entität
    return new Array(num);
  }

  removePadlet() {
    if (confirm('Möchtest du das Padlet wirklch löschen?')) {
      this.bs.remove(this.padlet.id.toString()).subscribe((res:any) => this.router.navigate(['../'],
        { relativeTo: this.route}));
      this.toastr.success('Das Padlet wurde erfolgreich gelöscht');
    }
  }
}
