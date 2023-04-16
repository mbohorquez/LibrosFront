import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  IsAuthenticated = false;
  title = 'kardex-angular';

  private subsAuth$: Subscription;

  constructor(
    private securityService: SecurityService,
    private router: Router  ) {
    this.IsAuthenticated = this.securityService.IsAuthorized;

    this.subsAuth$ = this.securityService.authChallenge$.subscribe(
      (isAuth) => {
        this.IsAuthenticated = isAuth;
      });
      
      if (!this.IsAuthenticated) {
        this.router.navigate(['/login']);
      }
  }

  ngOnDestroy() {
    if (this.subsAuth$) {
      this.subsAuth$.unsubscribe();
    }
  }
}
