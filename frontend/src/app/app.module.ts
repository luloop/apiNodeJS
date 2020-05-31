import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './main/app.component';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PieComponent } from './components/pie/pie.component';
import { SliderHomeComponent } from './components/slider-home/slider-home.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    PieComponent,
    SliderHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, ReactiveFormsModule,
    AngularMaterialModule, HttpClientModule, OwlModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent] 
})
export class AppModule { }
