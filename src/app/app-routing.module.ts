import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {NgModule} from "@angular/core";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'padlets', component: PadletListComponent },
  { path: 'padlets/:id', component: PadletDetailsComponent },
  { path: 'newpadlet', component: PadletFormComponent },
  { path: 'newpadlet/:id', component: PadletFormComponent },
  { path: 'padlets/:id/entries/:id', component: EntryFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
