import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user = this.authService.getUser();

  constructor(
    private authService: AuthService,
  ) {

  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
}
