
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { tap, map, Observable, catchError, of } from 'rxjs';

import { Usuario } from './../models/usuario.model';
import { RegisterForm } from './../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

              

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renewLogin`, {
      headers: { 'x-token': this.token }
    }).pipe(
      map( (resp: any) => {

        const { email, google, nombre, role, uid, img = '' } = resp.usuario;

        this.usuario = new Usuario( nombre, email, '', img, google, role, uid)
        localStorage.setItem('token', resp.token);
        return true
      }),

      catchError( error => of(false) )
    );
  }

  crearUsuario(formData: RegisterForm) {
    
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
    
  };

  actualizarPerfil(data: {email: string, nombre: string}) {

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: { 'x-token': this.token }
    })
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  login(formData: LoginForm) {
    
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
    
  }

  loginGoogle( token: string ) {
    
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    
    google.accounts.id.revoke( this.usuario.email, () => {
      
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login')
      })
    })

  }
  
}
