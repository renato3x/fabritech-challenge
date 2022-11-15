import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  saving: boolean = false

  passwordIsEquals: boolean = false

  constructor(
    private builder: FormBuilder,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router
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
    this.toggleSaving()
    const user = this.buildUser()

    this.authService.signup(user)
    .subscribe(
      () => {
        this.snackbar.open('Você foi cadastrado com sucesso!', 'Ok', { duration: 5000 })
        this.router.navigateByUrl('/authentication/signin')
      },
      error => {
        this.toggleSaving()
        if (error instanceof HttpErrorResponse) {
          this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
        } else {
          this.snackbar.open('Ocorreu algum erro ao cadastrar :(', 'Ok', { duration: 5000 })
        }
      },
      () =>{
        this.toggleSaving()
      }
    )
  }

  private buildUser(): User {
    const user = { ...this.userForm.value }
    delete user.confirmPassword

    return user as User
  }

  private toggleSaving() {
    this.saving = !this.saving
  }
}
