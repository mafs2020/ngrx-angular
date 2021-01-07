import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  mostraModal: boolean;
  error: {} = {};
  datosMostrara: string;
  motivoModal: string = '';
  // datosMostrara = this._usuarioServices.infoModal$;
  constructor(
    private _usuarioServices: UsuarioServiceService,
    private router: Router
    ) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this._usuarioServices.mostrarmodalnu.subscribe(mostrar => this.mostraModal = mostrar);
    this._usuarioServices.infoModal$.subscribe(data => {
      console.log(data);
      this.datosMostrara = data.modalContent;
      this.motivoModal = data.motivo
    });
  }

  cerrar() {
    this.mostraModal = !this.mostraModal;
    this._usuarioServices.mostraModal.next(this.mostraModal);
    this._usuarioServices.infoModal.next({motivo:'', modalContent:''});
  }

  eliminarUsuario() {
    const usuario = this._usuarioServices.user;
    this.cerrar();
    this._usuarioServices.eliminar(usuario.id).subscribe(data => {
      this._usuarioServices.mostraModal.next(true);
      this._usuarioServices.infoModal.next({motivo: 'aviso', modalContent: 'se elimino al usuario correctamente'});
      this.router.navigate(['']);
    });
  }

}
