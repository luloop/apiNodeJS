import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.css']
})
export class SliderHomeComponent implements OnInit {

  respuesta = "hola";
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  Images = [{
    img: '../../../assets/img/hero-bg.png',
    text: "lo que esta arriba lo escribe la API",
    titulo: this.respuesta,
  },
  {
    img: '../../../assets/img/hero-bg0.png',
    text: "con amor",
    titulo: 'Desde Chacarita',
  },
  {
    img: '../../../assets/img/hero-bg1.png',
    text: "que queda la app en el celular",
    titulo: "Que lindo",
  }]

  SlideOptions = { items: 1, dots: true, nav: true };
  CarouselOptions = { items: 3, dots: true, nav: true };

 

  constructor(private http: ApiService, private login: MatDialog) { }

  ngOnInit() {
    this.http.traerIndustrias().subscribe((data) => {
      console.log(data);
      this.respuesta = data['msg'];
      
    });

  }


  openLogin() {
    this.login.open(LoginComponent);
    this.fun();
  }
  
  @ViewChild('owlElement ',{static:true}) owlElement: OwlCarousel
  fun() {
    this.owlElement.trigger('changed.owl.carousel')
   
    //duration 200ms
  }
}