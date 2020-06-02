import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { NotificacionesService } from '../services/notificaciones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  title = 'frontend';

  constructor( private login: MatDialog, private notificacion: NotificacionesService) { }

  ngOnInit() {
    
  }


  openLogin() {
    this.login.open(LoginComponent);
  }

  modalSobreMi()
  {
    this.notificacion.prueba("Este texto se pasa por parametro");
  }


}
