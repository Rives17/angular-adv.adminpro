import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {


  constructor(private usuarioService: UsuarioService) {
  }

  logout() {
    this.usuarioService.logout();
  }
}
