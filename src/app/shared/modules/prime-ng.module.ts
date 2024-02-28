import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import {SpeedDialModule} from 'primeng/speeddial';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';

const modules:any = [
  TableModule,
  ButtonModule,
  InputTextModule,
  DropdownModule,
  DialogModule,
  SpeedDialModule,
  InputTextareaModule,
  MultiSelectModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports:modules
})
export class PrimeNgModule { }
