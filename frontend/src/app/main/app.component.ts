import { Component, HostListener } from '@angular/core';
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
  mostrarNav;

  constructor( private login: MatDialog, private notificacion: NotificacionesService) { }

  ngOnInit() {
    this.mostrarNav = false;
    
  }


  openLogin() {
    this.login.open(LoginComponent);
  }

  modalSobreMi()
  {
    this.notificacion.prueba("Este texto se pasa por parametro");
  }

  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {

    let element = document.getElementById('navbar');

    if (window.pageYOffset > (window.innerHeight / 5)) {
      element.classList.add('sticky');
      element.classList.remove('d-none');
      element.classList.remove('slideOutUp');
      element.classList.add('animated');
      element.classList.add('slideInDown');
      this.mostrarNav = true;
    }
    else if (window.pageYOffset < (window.innerHeight / 5) && window.pageYOffset > 0) {
     
      element.classList.add('slideOutUp');
      this.mostrarNav = true;

    }
    else {    
      element.classList.remove('sticky');
      element.classList.remove('flash');
      element.classList.add('d-none');
    
    }

  }


}
