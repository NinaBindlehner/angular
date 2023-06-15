import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Entry, Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntryStoreService} from "../shared/entry-store.service";
import {EntryFactory} from "../shared/entry-factory";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
//import {relative} from "@angular/compiler-cli";

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
  is_public = true;

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
      //this.buildEntriesArray();
      this.padletForm = this.fb.group({
        id: this.padlet.id,
        title: [this.padlet.title, Validators.required],
        description: [this.padlet.description, Validators.required],
        is_public: this.padlet.is_public //sobald i des auskommentiere, zeigts mir beim Bearbeiten vom Padlet die Felder wieder ausgefüllt an, sonst verzögert
      });

      this.padletForm.statusChanges.subscribe(() =>
        this.updateErrorMessages());
    }

    /*buildEntriesArray() {
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
    }*/

    //Pusht Subformular also neue Form-Group in Entries-Array rein
    addEntriesControl() {
      this.entries.push(this.fb.group({id: 0, title: null, description: null, padlet_id: 0, user_id: 0}));
    }

    updateErrorMessages() {
      console.log("Ist Formular invalid? " + this.padletForm.invalid);
      this.errors = {};

      for (const message of PadletFormErrorMessages) {
        const control = this.padletForm.get(message.forControl);
        if (
          control &&
          control.dirty &&
          control.invalid && control.errors &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]
        ) {
          this.errors[message.forControl] = message.text;
        }
        console.log(message);

      }
    }

    submitForm() {
      /*this.padletForm.value.entries = this.padletForm.value.entries.filter(
        (thumbnail: { url: string }) => thumbnail.url //ev. anpassen an Entries
      )*/
      const padlet: Padlet = PadletFactory.fromObject(this.padletForm.value); //Werte aus Formular in neues Padlet
      //padlet.users = this.padlet.users; //werden einfach rüberkopiert

      if (this.isUpdatingPadlet) {
        this.bs.update(padlet).subscribe(res => {
          this.router.navigate(["../../padlets", padlet.id], {
            relativeTo: this.route
          });
      });
    } else { //neues Padlet anlegen
        padlet.user_id = 1;
        console.log(padlet);
        this.bs.create(padlet).subscribe(res => {
          this.padlet = PadletFactory.empty();
          this.padletForm.reset(PadletFactory.empty()); //reset also alle Werte, die im Padlet-Formular drinnen sind, werden mit EmptyPadlet-Objekt überschrieben
          this.router.navigate(["../padlets"], {
            relativeTo: this.route
          });
        });
      }
    }

}
