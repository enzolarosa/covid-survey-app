import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainViewComponent} from './components/main-view/main-view.component';
import {LiveDataComponent} from './components/live-data/live-data.component';

const routes: Routes = [
  {path: '', redirectTo: '/main-view', pathMatch: 'full'},
  {
    path: 'main-view',
    component: MainViewComponent,
  },
  {
    path: 'live-data',
    component: LiveDataComponent,
  },

  {path: '**', redirectTo: '/main-view'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
