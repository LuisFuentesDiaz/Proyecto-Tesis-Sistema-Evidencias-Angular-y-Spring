import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../servicios/authentication/token.service';

@Injectable({
    providedIn: 'root'
})
export class RolGuardService implements CanActivate {

    realRol: string[] = [];
    rol: string;
    isRol: boolean = false;
    constructor(
        private token: TokenService,
        private route: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRol = route.data.expectedRol;
        const roles = this.token.getAuthorities();

        roles.forEach(rol => {

            if (rol == "ROLE_ADMIN") {
                this.realRol.push('admin');
            } else if (rol == 'ROLE_DCA') {
                this.realRol.push('dca');
            } else if (rol == 'ROLE_DIRECCION_DE_DOCENCIA') {
                this.realRol.push('director_docencia');
            } else if (rol == 'ROLE_RESPONSABLE') {
                this.realRol.push('responsable');
            } else if (rol == 'ROLE_USER') {
                this.realRol.push('user');
            }
        });
        expectedRol.forEach(real => {
            if (this.realRol.indexOf(real) == -1) {

                if (this.isRol == false) {
                    this.isRol = false;
                }

            } else {
                if (this.isRol == false) {
                    this.isRol = true;
                }
            }
        });
        this.realRol = [];
        return this.isRol;
    }
}
