import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioServices : UsuarioServiceService
    ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }
  iniciarFormulario(){
    this.formulario = this.fb.group({
      nombre: ["", { validators: Validators.required, updateOn: "blur" }],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(60)]]
    });
  }

  crearUsuario(){
    this._usuarioServices.crearUsuario(this.formulario.value).subscribe(data => {
      this._usuarioServices.mostrarModalfuncion({motivo:'aviso', modalContent:'se agrego al usuario'});
      this.formulario.patchValue({nombre: '', apellido: '', edad: null})
      this.formulario.reset();
    });
  }
  get nombre() {
    // console.log(this.formulario.get('nombre').errors);
    return this.formulario.get('nombre');
  }

  get apellido() {
    // console.log(this.formulario.get('apellido').errors);
    return this.formulario.get('apellido');
  }

  get edad() {
    return this.formulario.get('edad');
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }

}
