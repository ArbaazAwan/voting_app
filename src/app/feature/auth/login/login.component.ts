import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!:FormGroup;
  currentYear = new Date().getFullYear();

  constructor(
    private route: Router,
    private fb:FormBuilder,
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onSubmit(): void {
    const formValue = this.form.value;
    console.log('form value:', formValue);
    this.route.navigate(['dashboard']);
  }
}
