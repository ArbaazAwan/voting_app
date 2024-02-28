import { NgModule } from '@angular/core';
import { PrimeNgModule } from './modules/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules:any = [
  PrimeNgModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: [],
  providers: [],
})
export class SharedModule { }


