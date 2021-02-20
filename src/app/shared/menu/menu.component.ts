import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  imagen: string;
  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
    this.usuarioService.imagenCambiar$.subscribe(url => {
      console.log(url);
      this.imagen = url;
    });
  }

}
