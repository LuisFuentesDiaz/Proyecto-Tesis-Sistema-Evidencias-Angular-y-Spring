import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/clases/login-usuario';
import { AuthService } from 'src/app/servicios/authentication/auth.service';
import { TokenService } from 'src/app/servicios/authentication/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isLogged = false;
    isLoginFails = false;
    loginUsuario: LoginUsuario;
    nombreUsuario: string;
    password: string;
    roles: string[] = [];
    errMsj: string;

    constructor(
        private tokenService: TokenService,
        private authService: AuthService,
        private router: Router
    ) { }


    ngOnInit(): void {
        if (this.tokenService.getToken()) {

            this.isLogged = true;
            this.isLoginFails = false;
            this.roles = this.tokenService.getAuthorities();

            this.router.navigate(['menu']);

        }
    }

    onLogin(): void {
        this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
        this.authService.login(this.loginUsuario).subscribe(
            data => {
                this.isLogged = true;
                this.isLoginFails = false;
                window.location.reload();
                this.tokenService.SetToken(data.token);
                this.tokenService.SetUserName(data.nombreUsuario);
                this.tokenService.SetAuthorities(data.authorities);
                this.roles = data.authorities;
                this.router.navigate(['menu']);
            },
            err => {
                this.isLogged = false;
                this.isLoginFails = true;
                this.errMsj = err.error.mensaje;
                console.log(err.error.mensaje);
            }
        );
    }
}
