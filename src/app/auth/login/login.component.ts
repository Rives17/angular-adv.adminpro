import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;
  public usuario!: string;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) {
              }

  ngAfterViewInit(): void {
    this.googleInit();

  }

  googleInit() {

    return new Promise<void> ( resolve => {

      google.accounts.id.initialize({
        client_id: "869468473208-bm3ge9jitdvb1iu5bfak2ir5tnf8h1k4.apps.googleusercontent.com",
        callback: (response: any) => this.handleCredentialResponse(response)
      });
  
      google.accounts.id.renderButton(
        this.googleBtn.nativeElement,
        { theme: "outline", size: "large" }  // customization attributes
      )
  
      resolve();

    })
  }

  handleCredentialResponse( response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe(resp => {
        console.log(resp.email);
        
        this.usuario = resp.email

        this.ngZone.run(() => {
          this.router.navigateByUrl('/')
        })
      })
  }

  login() {
    
    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => {

      if ( this.loginForm.get('remember')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value)
      }else {
        localStorage.removeItem('email')
      }
    
      this.router.navigateByUrl('/');      
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    });
    
  }
}
