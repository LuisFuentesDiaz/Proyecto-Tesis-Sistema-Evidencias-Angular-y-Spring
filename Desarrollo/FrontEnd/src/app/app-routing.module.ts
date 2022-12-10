import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuprincipalComponent } from './modulos/menuprincipal/menuprincipal.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { LoginComponent } from './component/login/login.component';
import { DebilidadComponent } from './component/debilidad/debilidad.component';
import { RolGuardService as guard } from './guards/rol-guard.service';
import { UnidadComponent } from './component/unidad/unidad.component';
import { CriterioComponent } from './component/criterio/criterio.component';
import { ProcesoComponent } from './component/proceso/proceso.component';
import { RegistroComponent } from './component/registro/registro.component';
import { AmbitoGeograficoComponent } from './component/ambito-geografico/ambito-geografico.component';
import { AmbitoAcademicoComponent } from './component/ambito-academico/ambito-academico.component';
import { EvidenciaComponent } from './component/evidencia/evidencia.component';
import { ListComponent } from './component/evidencia/list/list.component';
import { VerResponsableComponent } from './component/evidencia/ver-responsable/ver-responsable.component';
import { VerDcaComponent } from './component/evidencia/ver-dca/ver-dca.component';
import { ListResponsableComponent } from './component/evidencia/list-responsable/list-responsable.component';
import { ListDcaComponent } from './component/evidencia/list-dca/list-dca.component';
import { VerUsuarioComponent } from './component/evidencia/ver-usuario/ver-usuario.component';
import { EvidenciaService } from './servicios/evidencia/evidencia.service';
import { ListDirectorComponent } from './component/evidencia/list-director/list-director.component';
import { BarraComponent } from './component/graficos/barra/barra.component';
import { ListDirectorUnidadComponent } from './component/evidencia/list-director/list-director-unidad/list-director-unidad.component';
import { MiPerfilComponent } from './component/mi-perfil/mi-perfil.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuprincipalComponent,
    canActivate: [guard],
    data: {
      expectedRol: ['dca', 'admin', 'director_docencia', 'responsable', 'user'],
    },
  },
  {
    path: 'debilidad',
    component: DebilidadComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'unidad',
    component: UnidadComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'criterio', component: CriterioComponent },
  { path: 'proceso', component: ProcesoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ambito-geografico', component: AmbitoGeograficoComponent },
  { path: 'ambito-academico', component: AmbitoAcademicoComponent },
  { path: 'evidencia/nueva-evidencia/:id', component: EvidenciaComponent },
  {
    path: 'evidencia/ver-evidencia-responsable',
    component: VerResponsableComponent,
  },
  { path: 'evidencia/ver-evidencia-dca', component: VerDcaComponent },
  {
    path: 'evidencia/ver-evidencia-usuario/:id',
    component: VerUsuarioComponent,
  },
  { path: 'evidencia', component: ListComponent },
  { path: 'evidencia-director', component: ListDirectorComponent },
  { path: 'evidencia-director-unidad', component: ListDirectorUnidadComponent },
  { path: 'evidencia-responsable', component: ListResponsableComponent },
  { path: 'evidencia-dca', component: ListDcaComponent },
  { path: 'graficos/barra', component: BarraComponent },
  { path: 'usuario/mi-perfil', component: MiPerfilComponent },

  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
