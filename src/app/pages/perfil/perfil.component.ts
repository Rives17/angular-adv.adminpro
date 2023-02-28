import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import  Swal  from 'sweetalert2';

import { FileUploadService } from './../../services/file-upload.service';
import { UsuarioService } from './../../services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public uploadImg!: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario
  }

  ngOnInit() {
    this.perfilForm = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      email: new FormControl(this.usuario.email, Validators.email)
    })
  }


  actualizarPerfil() {

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Bien!', 'Los cambios han sido guardados', 'success');
      }, (err) => {
        Swal.fire('Ooops!', err.error.msg, 'error');
        
      })
    
  }

  cambiarImagen(file: File) {
    this.uploadImg = file;

    if(!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
     this.imgTemp = reader.result
    }
    return
  }

  actualizarImg(){
    this.fileUploadService
      .actualizarFoto(this.uploadImg, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Bien!', 'Imagen actualizada con éxito', 'success');

      }).catch (err => {
        Swal.fire('Ooops!', 'No se pudo actualizar la imagen', 'error');
      })

  }


}
