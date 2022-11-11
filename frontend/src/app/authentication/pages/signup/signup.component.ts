import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { User } from 'src/app/globals/models/User';
import { AuthenticationService } from 'src/app/globals/services/authentication.service';

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
    private builder: FormBuilder,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
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

  signup() {
    const user = this.buildUser()

    this.authService.signup(user)
    .subscribe(
      user => {
        console.log(user)
        this.snackbar.open('Você foi cadastrado com sucesso!', 'Ok', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    )
  }

  private buildUser(): User {
    const user = { ...this.userForm.value }
    delete user.confirmPassword

    return user as User
  }
}
