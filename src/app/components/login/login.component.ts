import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  constructor(private auth: UserService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => (this.user = user));
    console.log(this.user);
  }
}
