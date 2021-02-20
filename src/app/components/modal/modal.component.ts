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
  error = {};
  datosMostrara: string;
  motivoModal = '';
  // datosMostrara = this.usuarioServices.infoModal$;
  constructor(
    private usuarioServices: UsuarioServiceService,
    private router: Router
    ) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.usuarioServices.mostrarmodalnu.subscribe(mostrar => this.mostraModal = mostrar);
    this.usuarioServices.infoModal$.subscribe(data => {
      console.log(data);
      this.datosMostrara = data.modalContent;
      this.motivoModal = data.motivo;
    });
  }

  cerrar() {
    this.mostraModal = !this.mostraModal;
    this.usuarioServices.mostraModal.next(this.mostraModal);
    this.usuarioServices.infoModal.next({motivo:'', modalContent:''});
  }

  eliminarUsuario() {
    const usuario = this.usuarioServices.user;
    this.cerrar();
    this.usuarioServices.eliminar(usuario.id).subscribe(data => {
      this.usuarioServices.mostraModal.next(true);
      this.usuarioServices.infoModal.next({motivo: 'aviso', modalContent: 'se elimino al usuario correctamente'});
      this.router.navigate(['']);
    });
  }

}
