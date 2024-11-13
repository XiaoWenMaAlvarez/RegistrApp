import { TestBed } from '@angular/core/testing';

import { AlumnosService } from './alumnos.service';

import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';

describe('AlumnosService', () => {
  let service: AlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    service = TestBed.inject(AlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Encontrar alumno de prueba', async () => {
    let sub$ = service.encontrarAlumnoPorId("82vAPSM8toZvnrt2Nxd7jWstquG3");
    const alumno: Alumno[] = await firstValueFrom(sub$) as Alumno[];
    let nombre: string = alumno[0].nombre;
    expect(nombre).toEqual("Juan Alberto Pérez Gonzales");
  });

  it('Encontrar alumno por correo', async () => {
    let sub$ = service.encontrarAlumnoPorCorreo("ju.perez@duocuc.cl");
    const alumno: Alumno[] = await firstValueFrom(sub$) as Alumno[];
    let nombre: string = alumno[0].nombre;
    expect(nombre).toEqual("Juan Alberto Pérez Gonzales");
  });

  it('Login con alumno', async () => {
    let res = await service.login("ju.perez@duocuc.cl", "alumno123");
    expect(res.user.uid).toEqual("82vAPSM8toZvnrt2Nxd7jWstquG3");
    service.logout();
  });

});
