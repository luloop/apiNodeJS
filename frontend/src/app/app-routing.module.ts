import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { DialogoNotificacionesComponent } from './components/notificaciones/notificaciones/dialogo-notificaciones/dialogo-notificaciones.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';



const routes: Routes = [

  { path: '', component: InicioComponent},
  { path: 'crearBaseDeDatos', component: ModalConfirmacionComponent},
  { path: 'hola', component: PanelPrincipalComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
