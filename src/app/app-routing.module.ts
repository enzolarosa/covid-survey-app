import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainViewComponent} from './components/main-view/main-view.component';
import {LiveDataComponent} from './components/live-data/live-data.component';
import {NearYouComponent} from './components/near-you/near-you.component';

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
  {
    path: 'near-you',
    component: NearYouComponent,
  },
  {path: '**', redirectTo: '/main-view'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
