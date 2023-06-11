import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Entry, Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntryStoreService} from "../shared/entry-store.service";
import {EntryFactory} from "../shared/entry-factory";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})
export class PadletFormComponent implements OnInit {

  padletForm : FormGroup;
  padlet : Padlet = PadletFactory.empty();
  //entry : Entry = EntryFactory.empty(); //ev weggeben
  errors : { [key: string]: string } = {}; //leeres Error-Array initialisieren
  isUpdatingPadlet = false; //abprüfen, ob neues oder bestehendes Padlet bearbeitet wird
  entries : FormArray; //ev weggeben

  constructor(
    private fb: FormBuilder,
    private bs: PadletStoreService,
    //private es: EntryStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.padletForm = this.fb.group({});
    this.entries = this.fb.array([]); //ev. weggeben
  }

    ngOnInit(): void {
      const id = this.route.snapshot.params["id"];
      if (id) {
        this.isUpdatingPadlet = true; //haben id
        this.bs.getSingle(id).subscribe(
          padlet => {
            this.padlet = padlet;
            this.initPadlet();
          }
        );
      }
      this.initPadlet(); //muss auch aufgerufen werden, wenn keine ID vorhanden also leeres Padlet muss initialiert werden + Formularkomponenten müssen vorbereitet werden
    }

    //einzelne Property vom Padlet an die Formularfelder binden + Validierung
    initPadlet() {
      this.buildEntriesArray();
      this.padletForm = this.fb.group({
        id: this.padlet.id,
        title: [this.padlet.title, Validators.required],
        description: [this.padlet.description, Validators.required],
        isPublic: this.padlet.is_public //sobald i des auskommentiere, zeigts mir beim Bearbeiten vom Padlet die Felder wieder ausgefüllt an, sonst verzögert
      })
    }

    buildEntriesArray() {
      if(this.padlet.entries){
        this.entries = this.fb.array([]);
        for (let entry of this.padlet.entries) {
          let fg = this.fb.group({
            id: new FormControl(entry.id),
            title: new FormControl(entry.title, [Validators.required]),
            description: new FormControl(entry.description, [Validators.required]),
            padlet_id: new FormControl(entry.padlet_id),
            user_id: new FormControl(entry.user_id)
          });
          this.entries.push(fg);
        }
      }
    }

    //Pusht Subformular also neue Form-Group in Entries-Array rein
    addEntriesControl() {
      this.entries.push(this.fb.group({id: 0, title: null, description: null, padlet_id: 0, user_id: 0}));
    }

    submitForm() {

    }

}
