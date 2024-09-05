import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import {NavParams, NavController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  form: FormGroup = new FormGroup({
    correo: new FormControl(''),
    pass: new FormControl('')
  });


  constructor(
    private alumnosService: AlumnosService,
    private profesorService: ProfesorService,
    private navParams:NavParams,
    private navController:NavController,
    private toastController: ToastController
  ) { }

  async onSubmit(){
    const data = this.form.value;
    const emailRecibido = data.correo;
    const passRecibida = data.pass;

    if(!emailRecibido || !passRecibida) {
      const toast = await this.toastController.create({
        message: "Rellene todos los campos",
        duration: 5000,
        position: 'top'
      });
      await toast.present();
      return;
    }

    if(!emailRecibido.endsWith("@duocuc.cl") && !emailRecibido.endsWith("@profesor.duoc.cl")) {
      const toast = await this.toastController.create({
        message: "Correo inválido",
        duration: 5000,
        position: 'top'
      });
      await toast.present();
      return
    }

    if(emailRecibido.endsWith("@duocuc.cl")) {
      const idAlumno = this.alumnosService.login(emailRecibido, passRecibida);
      if(idAlumno === 0){
        const toast = await this.toastController.create({
          message: "Credenciales inválidas",
          duration: 5000,
          position: 'top'
        });
        await toast.present();
        return;
      }else {
        const nombreAlumno = this.alumnosService.encontrarAlumnoPorId(idAlumno).nombre;
        const toast = await this.toastController.create({
          message: "Bienvenido alumno(a): " + nombreAlumno,
          duration: 5000,
          position: 'top'
        });
        await toast.present();
        this.navParams.data['idAlumno'] = idAlumno;
        this.navController.navigateForward('estudiante/tabs/cursos');
        return;
      }
    }

    if(emailRecibido.endsWith("@profesor.duoc.cl")) {
      const idProfesor = this.profesorService.login(emailRecibido, passRecibida);
      if(idProfesor === 0){
        const toast = await this.toastController.create({
          message: "Credenciales inválidas",
          duration: 5000,
          position: 'top'
        });
        await toast.present();
        return;
      }else {
        const nombreProfesor = this.profesorService.encontrarProfesorPorId(idProfesor).nombre;
        const toast = await this.toastController.create({
          message: "Bienvenido profesor(a): " + nombreProfesor,
          duration: 5000,
          position: 'top'
        });
        await toast.present();
        this.navParams.data['idProfesor'] = idProfesor;
        this.navController.navigateForward('profesor/tabs/tab1');
      }
    }

  };
  
}
