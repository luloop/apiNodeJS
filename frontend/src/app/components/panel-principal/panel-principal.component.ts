import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.getElementById('sidenav-main');
    element.setAttribute('style', 'width:58px')
    let element2 = document.getElementById('panel');
    element2.setAttribute('style', 'width: calc(100vw-58px); margin-left:58px !important')
  }



}
