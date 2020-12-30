import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/interface';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  USuarios: IUsuario[] = [];
  constructor(
    private router: Router,
    private _usuarioServices :UsuarioServiceService
    ) { }

  ngOnInit(): void {
    this._usuarioServices.getAllUSers$.subscribe(data => this.USuarios = data);
  }
  regresar() {
    this.router.navigate(['/login']);
  }
  enviar(id: number){
    this.router.navigate(['dashboard/usuario-detalle', id])
  }

  crear() {
    this.router.navigate(['dashboard/crear']);
  }

}
