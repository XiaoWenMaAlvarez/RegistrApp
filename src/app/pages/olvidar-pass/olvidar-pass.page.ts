import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController
  ) { }

  async onSubmit() {
    const emailRecibido = this.form.value.correo;
    if(emailRecibido.endsWith("@duocuc.cl")) {
      if(this.alumnosService.setearPass(emailRecibido)){
        this.navController.navigateForward('pass-restablecido');
        return
      }
    } else if(emailRecibido.endsWith("@profesor.duoc.cl")){
      if(this.profesorService.setearPass(emailRecibido)){
        this.navController.navigateForward('pass-restablecido');
        return;
      }
    }else {
      const toast = await this.toastController.create({
        message: "Correo inválido",
        duration: 5000,
        position: 'top'
      });
      await toast.present();
      return;
    }
    const toast = await this.toastController.create({
      message: "No se ha podido encontrar el correo",
      duration: 5000,
      position: 'top'
    });
    await toast.present();
  }
}
