import { Component } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { NavController, ToastController } from '@ionic/angular';
import {NavParams} from '@ionic/angular';


@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage {

  constructor(
    private toastController: ToastController,
    private navController: NavController,
    private navParams:NavParams,
  ) { }

  private isValidQR(objeto) {
    return objeto && objeto.id_curso && objeto.id_clase && objeto.profesor && objeto.curso && objeto.url
  }

  ionViewWillEnter() {
    CapacitorBarcodeScanner.scanBarcode({
      hint: 0
    }).then(async value => {
      const result = value.ScanResult;

      try {
        let codigoQR = JSON.parse(result)
        if(this.isValidQR(codigoQR)) {
          this.navParams.data['codigoQR'] = codigoQR;
          this.navController.navigateForward('/estudiante/tabs/presente');
          
        } else {
          const toast = await this.toastController.create({
            message: "QR Inválido",
            duration: 5000,
            position: 'top'
          });
          await toast.present();
          this.navController.navigateForward('/estudiante/tabs/cursos');
        }
      } catch(error) {
        const toast = await this.toastController.create({
          message: "Ha ocurrido un error",
          duration: 5000,
          position: 'top'
        });
        await toast.present();
        this.navController.navigateForward('/estudiante/tabs/cursos');
      }

    })
  }

}
