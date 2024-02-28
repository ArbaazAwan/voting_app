import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InnerComponent } from './inner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NaListComponent } from './na-list/na-list.component';
import { ProvinceListComponent } from './province-list/province-list.component';
import { PaListComponent } from './pa-list/pa-list.component';
import { UcListComponent } from './uc-list/uc-list.component';
import { VoterListComponent } from './voter-list/voter-list.component';

const routes: Route[] = [
  {
    path: '',
    component: InnerComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo:'dashboard', pathMatch:'full' },
      { path: 'voter-list', component: VoterListComponent },
      { path: 'p-list', component: ProvinceListComponent },
      { path: 'na-list', component: NaListComponent },
      { path: 'pa-list', component: PaListComponent },
      { path: 'uc-list', component: UcListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class InnerRoutingModule {}
