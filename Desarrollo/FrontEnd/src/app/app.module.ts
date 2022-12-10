import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modulos/navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { interceptorProvider } from './interceptor/rol-interceptor.service';


//inicio servicio
import { CargarScriptsService} from "./cargar-scripts.service";
import { MenuprincipalComponent } from './modulos/menuprincipal/menuprincipal.component';
import { from } from 'rxjs';
import { FooterComponent } from './modulos/footer/footer.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { DebilidadComponent } from './component/debilidad/debilidad.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroPipe } from './pipes/filtro.pipe';
import { LoginComponent } from './component/login/login.component';
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
import { ListDirectorComponent } from './component/evidencia/list-director/list-director.component';
import { BarraComponent } from './component/graficos/barra/barra.component';
import { ChartsModule } from 'ng2-charts';
import { ListDirectorUnidadComponent } from './component/evidencia/list-director/list-director-unidad/list-director-unidad.component';
import { MiPerfilComponent } from './component/mi-perfil/mi-perfil.component';


//fin servicio

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuprincipalComponent,
    FooterComponent,
    UsuarioComponent,
    DebilidadComponent,
    FiltroPipe,
    LoginComponent,
    UnidadComponent,
    CriterioComponent,
    ProcesoComponent,
    RegistroComponent,
    AmbitoGeograficoComponent,
    AmbitoAcademicoComponent,
    EvidenciaComponent,
    ListComponent,
    VerResponsableComponent,
    VerDcaComponent,
    ListResponsableComponent,
    ListDcaComponent,
    VerUsuarioComponent,
    ListDirectorComponent,
    BarraComponent,
    ListDirectorUnidadComponent,
    MiPerfilComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule

  ],
  providers: [
    CargarScriptsService,
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
