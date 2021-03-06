import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/interface';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.scss']
})
export class UsuarioDetalleComponent implements OnInit {
  formulario: FormGroup;
  usuarioId: number;
  nombreUsuario: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioServices: UsuarioServiceService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.route.paramMap.subscribe(
      params => {
        if(!params.has('id') || isNaN(+params.get('id'))){
          this.router.navigate(['/dashboard']);
        } else {
          this.usuarioServices.usuarioDetalle(+params.get('id')).subscribe(user => {
            this.usuarioServices.user = user;
            this.usuarioId = +user.id;
            this.nombreUsuario = user.nombre;
            this.formulario.patchValue({nombre: user.nombre, edad: user.edad, apellido: user.apellido});
          });
        }
      }
    );
  }

  iniciarFormulario() {
    this.formulario = this.fb.group({
      // asyncValidators: []
      nombre: ['', { validators: Validators.required, updateOn: 'blur' }],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(60)]]
    });
  }

  // cambie la A
  actualizarUsuario() {
    this.usuarioServices.actualizarUsuario(this.usuarioId, this.formulario.value)
      .subscribe(data => {
        // this.router.navigate(['/dashboard']);
        this.usuarioServices.mostraModal.next(true);
    this.usuarioServices.infoModal.next({motivo: 'usuario', modalContent: `se actualizo el usuario`});
      });
  }

  eliminar() {
    this.usuarioServices.mostraModal.next(true);
    this.usuarioServices.infoModal.next({motivo: 'usuario', modalContent: `deseas eliminar al usuario: ${this.nombreUsuario}`});
    // this.usuarioServices.eliminar(this.usuarioId).subscribe(data => console.log(data));101
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
