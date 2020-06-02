import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-notificaciones',
  templateUrl: './dialogo-notificaciones.component.html',
  styleUrls: ['./dialogo-notificaciones.component.css']
})
export class DialogoNotificacionesComponent implements OnInit {

  tipo: string;
  titulo = "hubo un error";
  texto = "Algo no funciono";
  textoBoton;


  constructor(private dialogRef: MatDialogRef<DialogoNotificacionesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit() {
    console.log("this.data;", this.dialogRef._containerInstance._config.data);
    this.tipo = this.dialogRef._containerInstance._config.data.tipo;
    this.titulo = this.dialogRef._containerInstance._config.data.titulo;
    this.texto = this.dialogRef._containerInstance._config.data.texto;
    this.textoBoton = this.dialogRef._containerInstance._config.data.textoBoton;
  }


}
