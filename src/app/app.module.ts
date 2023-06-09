import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import { PadletListItemComponent } from './padlet-list-item/padlet-list-item.component';
import { PadletDetailsComponent } from './padlet-details/padlet-details.component';
import {PadletStoreService} from "./shared/padlet-store.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [PadletStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
