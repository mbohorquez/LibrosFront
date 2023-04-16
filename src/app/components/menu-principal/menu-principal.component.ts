import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(
    private secutiryService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  LogOut() {
    this.secutiryService.LogOff();
    this.router.navigate(['/login']);
  }

}
