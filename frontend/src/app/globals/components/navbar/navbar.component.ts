import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Partial<User> = {}

  constructor(
    public navbarService: NavbarService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userData
  }
}
