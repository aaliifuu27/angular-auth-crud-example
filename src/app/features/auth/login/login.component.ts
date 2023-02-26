import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    if (this.authService.getUser()) {
      router.navigate(['/employees'])
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Login');
    this.createForm();
  }

  private createForm() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loading = true;
    this.authService.login().subscribe(res => {
      const user = res.find((u: any) => {
        return u.email === email && u.password === password
      });
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/employees']);
      } else {
        this.notificationService.openSnackBar('login failed')
      }
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err)
      this.notificationService.openSnackBar('something went wrong')
    })
  }

}
