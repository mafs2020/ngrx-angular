import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { State } from '../state/app.state';

import * as UserActions from '../state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<State>
    ) { }

  ngOnInit(): void {
    
  }

  irPages(){
    this.router.navigate(['/dashboard']);
  }


  abrir(): void {
    this.store.dispatch( UserActions.loginLoad({usuario: {nombre: '', apellido: '', edad: 3}}));
  }
}
