import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { State } from '../state/app.state';

import * as UserActions from '../state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private router: Router,
    private store: Store<State>,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }
  
  iniciarFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['martin', Validators.required],
      password: ['123456', Validators.required]
    });
  }

  ingresar(): void {
    this.store.dispatch( UserActions.loginLoad({ usuario: this.formulario.value }) );
    console.log( this.formulario.value );
  }

  irPages(){
    this.router.navigate(['/dashboard']);
  }


  abrir(): void {
    this.store.dispatch( UserActions.loginLoad({usuario: {nombre: '', apellido: '', edad: 3}}));
  }
}
