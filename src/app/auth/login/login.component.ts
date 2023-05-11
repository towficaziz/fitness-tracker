import { State } from './../../app.reducer';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as formRoot from '../../app.reducer';
import { Observable } from 'rxjs-compat';
import { state } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  private loadingSubs!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService,
    private store: Store<{ui: formRoot.State}>) { }


  ngOnInit() {
    this.isLoading$ = this.store.select(formRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading =>{
    //   this.isLoading = isLoading;
    // });
    this.loginForm = new FormGroup({
      email: new FormControl('',{
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit(){
    // console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
  });
  }
  // ngOnDestroy() {
  //   if(this.loadingSubs){
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
