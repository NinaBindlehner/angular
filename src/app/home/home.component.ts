import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Padlet} from "../shared/padlet";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  padletSelected(padlet: Padlet) {
    this.router.navigate(['../padlets', padlet.id], { relativeTo: this.route});
  }
}
