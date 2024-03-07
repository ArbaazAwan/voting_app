import { NgModule } from '@angular/core';
import { NaListComponent } from './na-list/na-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { InnerComponent } from './inner.component';
import { InnerRoutingModule } from './inner-routing.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../shared/components/components.module';
import { ProvinceListComponent } from './province-list/province-list.component';
import { NaDetailComponent } from './na-list/na-detail/na-detail.component';
import { PaListComponent } from './pa-list/pa-list.component';
import { UcListComponent } from './uc-list/uc-list.component';
import { VoterListComponent } from './voter-list/voter-list.component';
import { RegisterVoterComponent } from './voter-list/register-voter/register-voter.component';
import { MaterialUIModule } from '../../shared/modules/material-ui.module';
import { FormComponent } from '../../shared/components/layouts/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    InnerRoutingModule,
    ComponentsModule,
    SharedModule,
    MaterialUIModule,
  ],
  exports: [],
  declarations: [
    NaListComponent,
    DashboardComponent,
    InnerComponent,
    ProvinceListComponent,
    NaDetailComponent,
    PaListComponent,
    UcListComponent,
    VoterListComponent,
    RegisterVoterComponent,
    FormComponent
  ],
  providers: [],
})
export class InnerModule { }
