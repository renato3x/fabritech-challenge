import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private doNotShowUrls: string[] = ['/', '/signin', '/signup']

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  get showNavbar$() {
    return this.authService.isTokenValid
    .pipe(
      map(isValid => {
        const url = this.router.url
        return isValid && !this.doNotShowUrls.includes(url)
      })
    )
  }
}
