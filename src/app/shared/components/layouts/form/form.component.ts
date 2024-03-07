import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControlConfig } from '../../../models/model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() controlConfig: FormControlConfig[] = [];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const group: any = {};
    this.controlConfig.forEach(control => {
      group[control.name] = [control.value || '', control.validators || []];
    });
    this.formGroup = this.fb.group(group);
  }

  isFieldInvalid(field: string) {
    const control = this.formGroup.get(field);
    return control?.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      // Mark all fields as touched to display validation messages
      Object.keys(this.formGroup.controls).forEach(field => {
        const control = this.formGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
