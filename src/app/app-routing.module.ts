import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {NgModule} from "@angular/core";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToNewPadletGuard} from "./can-navigate-to-new-padlet.guard";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'padlets', component: PadletListComponent },
  { path: 'padlets/:id', component: PadletDetailsComponent },
  { path: 'newpadlet', component: PadletFormComponent, canActivate:[CanNavigateToNewPadletGuard]},
  { path: 'newpadlet/:id', component: PadletFormComponent, canActivate:[CanNavigateToNewPadletGuard] },
  { path: 'padlets/:id/entries', component: EntryFormComponent, canActivate:[CanNavigateToNewPadletGuard] }, //nur lassen, wenn i des mit Entries neu anlegen nu schaff
  { path: 'padlets/:id/entries/:id', component: EntryFormComponent, canActivate:[CanNavigateToNewPadletGuard] },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToNewPadletGuard]
})

export class AppRoutingModule {}
