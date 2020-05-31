import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

interface Usuario {
  name,
  pass,
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Usuario;
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: ApiService) {

  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]],
      pass: [null, Validators.required],
    });

    console.log("formulario", this.formulario);

    this.formulario.controls['name'].setValue('oscar');
    this.formulario.controls['pass'].setValue('1234');

  }

  enviarDato(value) {
    console.log(value);

    this.http.logIn(value.name, value.pass);

  }

}
