import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoNotificacionesComponent } from '../components/notificaciones/notificaciones/dialogo-notificaciones/dialogo-notificaciones.component';
/**
 * para que sea un singleton y todos se suscriban al mismo emitter, no hay que ponerlo en los providers de cada componente.
 * Está definido en el provider del módulo
 *
 */

@Injectable()
export class NotificacionesService {

  constructor(public dialog: MatDialog) { }

  error(texto) {
    this.abrirNotificacion('error', "Ups!", texto, 'Cerrar');
    }

  prueba(texto) {
    this.abrirNotificacion('error', "Ey!", texto, 'Cerrar');
    }


  private abrirNotificacion(error, titulo, texto, textoBoton) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: error,
      texto: texto,
      titulo: titulo,
      textoBoton: textoBoton
    };
    dialogConfig.backdropClass = 'backdropBlanco',
      dialogConfig.hasBackdrop = true,
      dialogConfig.height = '500px',
      dialogConfig.width = '500px';
    this.dialog.open(DialogoNotificacionesComponent, dialogConfig);
  }




}
