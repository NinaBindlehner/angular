import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {PadletStoreService} from "../shared/padlet-store.service";
import {Padlet} from "../shared/padlet";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  foundPadlets: Padlet[] = [];
  keyup = new EventEmitter<string>();
  @Output() padletSelected = new EventEmitter<Padlet>();

  constructor(private bs: PadletStoreService) {}

  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .subscribe((padlets => this.foundPadlets = padlets));
  }
}
