import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup = this.builder.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    username: ['', [ Validators.required, Validators.minLength(5) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(10) ]],
    confirmPassword: ['', [ Validators.required, Validators.minLength(10) ]]
  })

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
}
