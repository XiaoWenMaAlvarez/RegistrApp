import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import {NavParams, NavController, ToastController, LoadingController} from '@ionic/angular';
import { Alumno } from 'src/app/models/alumno';
import { Profesor } from 'src/app/models/profesor';


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

  id_usuario: string;
  nombre: string;


  constructor(
    private alumnosService: AlumnosService,
    private profesorService: ProfesorService,
    private navParams:NavParams,
    private navController:NavController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  loading() {
    return this.loadingController.create({spinner: "crescent"})
  }

  ionViewWillEnter() {
    if(this.navParams.data['idAlumno']  == ''){
      this.navParams.data['idAlumno']  == 'X';
      window.location.reload();
    }
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top'
    });
    toast.present();
  }
  
  async obtenerNombreProfesor(id:string) {
    const loading = await this.loading();
    await loading.present();
    let sub = this.profesorService.encontrarProfesorPorId(id).subscribe((data: Profesor[]) => {
      this.nombre = data[0].nombre;
      loading.dismiss();
      sub.unsubscribe();
      this.presentToast("Bienvenido profesor(a): " + this.nombre, 2500);
    })
  }

  async obtenerNombreAlumno(id:string) {
    const loading = await this.loading();
    await loading.present();
    let sub = this.alumnosService.encontrarAlumnoPorId(id).subscribe((data: Alumno[]) => {
      this.nombre = data[0].nombre;
      loading.dismiss();
      sub.unsubscribe();
      this.presentToast("Bienvenido alumno(a): " + this.nombre, 2500);
    })
  }


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
      this.alumnosService.login(emailRecibido, passRecibida).then((res) => {
        this.obtenerNombreAlumno(res.user.uid);
        this.navParams.data['idAlumno'] = res.user.uid;
        this.form.reset()
        this.navController.navigateForward('estudiante/tabs/cursos');
      }).catch(async (err) => {
        this.presentToast("Credenciales inválidas", 2500);
      })
    }

    if(emailRecibido.endsWith("@profesor.duoc.cl")) {
      this.profesorService.login(emailRecibido, passRecibida).then((res) => {
        this.obtenerNombreProfesor(res.user.uid);
        this.navParams.data['idProfesor'] = res.user.uid;
        this.form.reset()
        this.navController.navigateForward('profesor/tabs/tab1');
      }).catch(async (err) => {
        this.presentToast("Credenciales inválidas", 2500);
      })
    }
  }
}
