import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDirectivaNotificaciones]'
})
export class DirectivaNotificacionesDirective {

  @Input() tipo: string;

  constructor(private el: ElementRef) {
    this.colorIcono();
  }

  colorIcono() {
    setTimeout(() => {
      console.log("this.tipo", this.tipo);
      switch (this.tipo) {
        case "error":
          this.el.nativeElement.style.backgroundColor = 'var(--error)';
          this.el.nativeElement.className = 'fas fa-times iconoClase  px-3 py-3';
          break;
        case "exito":
          this.el.nativeElement.style.backgroundColor = 'var(--exito)';
          this.el.nativeElement.className = 'fas fa-check iconoClase  px-3 py-3';
          break;
        case "atencion":
          this.el.nativeElement.style.backgroundColor = 'var(--atencion)';
          this.el.nativeElement.className = 'fas fa-exclamation iconoClase px-3 py-3  ';
          break;
        default:
          this.el.nativeElement.style.backgroundColor = 'pink';
          break;

      }

    }, 50);
  }





}
