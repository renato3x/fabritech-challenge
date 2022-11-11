import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup = this.builder.group({
    login: ['', [ Validators.required ]],
    password: ['', [ Validators.required, Validators.minLength(10) ]]
  })

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
}
