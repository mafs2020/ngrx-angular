import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.scss']
})
export class UsuarioDetalleComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _usuarioServices: UsuarioServiceService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.route.paramMap.subscribe(
      params => {
        if(!params.has('id') || isNaN(+params.get('id'))){
          this.router.navigate(['/dashboard']);
        } else {
          this._usuarioServices.usuarioDetalle(+params.get('id')).subscribe(user => {
            this.formulario.patchValue({nombre: user.nombre, edad: user.edad, apellido: user.apellido});
          });
        }
      }
    );
  }

  iniciarFormulario() {
    this.formulario = this.fb.group({
      // asyncValidators: []
      nombre: ["", { validators: [Validators.required], updateOn: "blur" }],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(60)]]
    });
  }
  ActualizarUsuario(){
    
    console.log(this.formulario.value);
  }

  get edad() {
    console.log(this.formulario.get('edad').errors);
    return this.formulario.get('edad');
  }

}
