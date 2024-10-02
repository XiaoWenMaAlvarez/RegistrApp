import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Alumno } from 'src/app/models/alumno';
import { Profesor } from 'src/app/models/profesor';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';

@Component({
  selector: 'app-olvidar-pass',
  templateUrl: './olvidar-pass.page.html',
  styleUrls: ['./olvidar-pass.page.scss'],
})
export class OlvidarPassPage {
  
  form: FormGroup = new FormGroup({
    correo: new FormControl(''),
  });

  constructor(
    private alumnosService: AlumnosService,
    private profesorService: ProfesorService,
    private navController:NavController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  loading() {
    return this.loadingController.create({spinner: "crescent"})
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top'
    });
    toast.present();
  }

  async onSubmit() {
    const emailRecibido = this.form.value.correo;
    if(emailRecibido.endsWith("@duocuc.cl")) {
      const loading = await this.loading();
      await loading.present();
      let sub = this.alumnosService.encontrarAlumnoPorCorreo(emailRecibido).subscribe((data: Alumno[]) => {
        if(data.length == 0) {
          this.presentToast("No se ha podido encontrar al alumno", 2500);
        }else {
          this.alumnosService.setearPass(emailRecibido).then((res) => {
            this.navController.navigateForward('pass-restablecido');
          })
        }
        loading.dismiss();
        sub.unsubscribe();
      })
    } else if(emailRecibido.endsWith("@profesor.duoc.cl")){
      const loading = await this.loading();
      await loading.present();
      let sub = this.profesorService.encontrarProfesorPorCorreo(emailRecibido).subscribe((data: Profesor[]) => {
        if(data.length == 0) {
          this.presentToast("No se ha podido encontrar al profesor", 2500);
        }else {
          this.profesorService.setearPass(emailRecibido).then((res) => {
            this.navController.navigateForward('pass-restablecido');
          })
        }
        loading.dismiss();
        sub.unsubscribe();
      })
    }else {
      this.presentToast("Correo inválido", 2500);
    }
  }
}
