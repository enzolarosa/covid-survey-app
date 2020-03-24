import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { LiveDataComponent } from './components/live-data/live-data.component';
import { NearYouComponent } from './components/near-you/near-you.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LiveDataComponent,
    NearYouComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
