import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

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

  passwordIsEquals: boolean = false

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.testPasswordEquality()
  }

  togglePasswordFieldType(input: HTMLInputElement) {
    const type = input.type

    if (type ==  'password') {
      input.type = 'text'
    } else {
      input.type = 'password'
    }
  }

  testPasswordEquality() {
    this.userForm.valueChanges
    .pipe(
      map(changes => {
        const { confirmPassword } = changes
        const { password } = this.userForm.value

        if (confirmPassword) {
          return confirmPassword === password
        }

        return false
      })
    )
    .subscribe(
      isEquals => {
        this.passwordIsEquals = isEquals
      }
    )
  }
}
