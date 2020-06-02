import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { DialogoNotificacionesComponent } from './components/notificaciones/notificaciones/dialogo-notificaciones/dialogo-notificaciones.component';



const routes: Routes = [

  { path: '', component: InicioComponent},
  { path: 'crearBaseDeDatos', component: ModalConfirmacionComponent},
  { path: 'hola', component: ModalConfirmacionComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
