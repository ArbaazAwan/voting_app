import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


const modules:any = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: [],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
})
export class MaterialUIModule { }


