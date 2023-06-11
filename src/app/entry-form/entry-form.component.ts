import {Component, OnInit} from '@angular/core';
import {Entry} from "../shared/entry";
import {EntryStoreService} from "../shared/entry-store.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntryFactory} from "../shared/entry-factory";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [
  ]
})
export class EntryFormComponent implements OnInit {
  //entry: Entry | undefined;
  entries: Entry[] = [];

  /*constructor(private es: EntryStoreService) {
  }

  ngOnInit(): void {
    this.es.getAll().subscribe(res => this.entries = res);
  }*/

  //padletForm : FormGroup;
  entryForm : FormGroup;
  entry : Entry = EntryFactory.empty();
  errors : { [key: string]: string } = {};
  isUpdatingEntry = false;

  constructor(
    private fb: FormBuilder,
    private es: EntryStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({});
    //this.entries = this.fb.array([]); //ev. weggeben
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingEntry = true; //haben id
      this.es.getSingle(id).subscribe(
        entry => {
          this.entry = entry;
          this.initEntry();
        }
      );
    }
    this.initEntry(); //muss auch aufgerufen werden, wenn keine ID vorhanden also leeres Padlet muss initialiert werden + Formularkomponenten müssen vorbereitet werden
  }

  //einzelne Property vom Padlet an die Formularfelder binden + Validierung
  initEntry() {
    //this.buildEntriesArray();
    this.entryForm = this.fb.group({
      id: this.entry.id,
      title: [this.entry.title, Validators.required],
      description: [this.entry.description, Validators.required],
      //isPublic: this.padlet.is_public //sobald i des auskommentiere, zeigts mir beim Bearbeiten vom Padlet die Felder wieder ausgefüllt an, sonst verzögert
    })
  }

  //TODO submit inkl. richtigem Ersteller
  submitForm(){}

}
