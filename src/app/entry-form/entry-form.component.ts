import {Component, OnInit} from '@angular/core';
import {Entry} from "../shared/entry";
import {EntryStoreService} from "../shared/entry-store.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntryFactory} from "../shared/entry-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Padlet} from "../shared/padlet";
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [
  ]
})
export class EntryFormComponent implements OnInit {
  //entry: Entry | undefined;
  entries: Entry[] = [];
  //padlet_id: number | undefined;

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
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthenticationService
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
    });
    this.entryForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  removeEntry() {
    if (confirm('Möchtest du den Beitrag wirklch löschen?')) {
      this.es.remove(this.entry.id.toString()).subscribe((res:any) => this.router.navigate(['/padlets'],
        { relativeTo: this.route}));
      this.toastr.success('Der Eintrag wurde erfolgreich gelöscht');
    }
  }

  /*addEntriesControl() {
    //this.entries.push(this.fb.group({id: 0, title: null, description: null, padlet_id: 0, user_id: 0}));
    this.entries.push({id: 0, title: "", description: "", padlet_id: 0, user_id:0});
  }*/

  updateErrorMessages() {
    console.log("Ist Formular invalid? " + this.entryForm.invalid);
    this.errors = {};

    for (const message of PadletFormErrorMessages) {
      const control = this.entryForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
      //console.log(message);
    }
  }

  //TODO submit inkl. richtigem Ersteller
  submitForm(){
    /*this.padletForm.value.entries = this.padletForm.value.entries.filter(
        (thumbnail: { url: string }) => thumbnail.url //ev. anpassen an Entries
      )*/
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value); //Werte aus Formular in neuen Entry
    //padlet.users = this.padlet.users; //werden einfach rüberkopiert

    if (this.isUpdatingEntry) {
      this.es.update(entry).subscribe(res => {
        this.router.navigate(["../../"], {
          relativeTo: this.route
        });
      });
    } else { //neuen Eintrag anlegen
      //entry.user_id = 1;
      const user_id = this.authService.getIdOfCurrentUser();
      //console.log(entry);
      this.es.create(entry).subscribe(res => {
        this.entry = EntryFactory.empty();
        this.entryForm.reset(EntryFactory.empty()); //reset also alle Werte, die im Entry-Formular drinnen sind, werden mit EmptyEntry-Objekt überschrieben
        this.router.navigate(["../"], {
          relativeTo: this.route
        });
      });
    }
  }

}
