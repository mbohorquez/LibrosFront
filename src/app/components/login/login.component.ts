import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';
import { LoginService } from 'src/app/services/apis/login.service';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/services/security.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy  {
  
  formLogin!: FormGroup;
  subRef$!: Subscription;
  error: boolean = false;
  
  
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private securityService: SecurityService
  ) { 
    this.securityService.LogOff();

    this.formLogin = formBuilder.group({
      email: ['',Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  

  Login(){
    const usuarioLogin: ILogin = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };
    
    this.dataService.post<IResponse>(this.loginService.getUrlLogin(), usuarioLogin).subscribe(data => {
      let token = data.body?.data.token;
      this.securityService.SetAuthData(token);
      this.router.navigate(['/home']);
    }, err => {
       this.error = true;
    })
  }

  ngOnDestroy() : void{
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

}
