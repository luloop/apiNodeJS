import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';

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
  cerrar = false;
  constructor(private formBuilder: FormBuilder, private http: ApiService, private alert: MatSnackBar, private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>){
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
    console.log("enviar el dato  ", this.http.logIn(value.name, value.pass));


    this.http.logIn(value.name, value.pass).subscribe(
      res => {
        console.log('HTTP response', res);
        this.alert.open("token generado " + res);
        this.router.navigateByUrl("/hola");
        this.cerrar = true;
        this.dialogRef.close();

      },
      err => {
        this.cerrar = false;
        document.getElementById('logIn').classList.add("animate__bounce");
        document.getElementById('logIn').classList.add("animate__animated");
        this.formulario.controls['pass'].setValue('');
        this.alert.open(err.error.error);
        console.log('HTTP Error', err)
        setTimeout(()=>{document.getElementById('logIn').classList.remove("animate__bounce");
        document.getElementById('logIn').classList.remove("animate__animated");},3000)
      }
    );

  }

}
