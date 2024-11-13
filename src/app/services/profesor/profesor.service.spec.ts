import { Profesor } from 'src/app/models/profesor';
import { TestBed } from '@angular/core/testing';

import { ProfesorService } from './profesor.service';

import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

describe('ProfesorService', () => {
  let service: ProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    service = TestBed.inject(ProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Encontrar profesor de prueba', async () => {
    let sub$ = service.encontrarProfesorPorId("NeIKnsD1IhREsIjCysdtRyBaPDS2");
    const profesor: Profesor[] = await firstValueFrom(sub$) as Profesor[];
    let nombre: string = profesor[0].nombre;
    expect(nombre).toEqual("Erik Andrés Arcos Rojas");
  });

  it('Encontrar profesor por correo', async () => {
    let sub$ = service.encontrarProfesorPorCorreo("er.arcos@profesor.duoc.cl");
    const profesor: Profesor[] = await firstValueFrom(sub$) as Profesor[];
    let nombre: string = profesor[0].nombre;
    expect(nombre).toEqual("Erik Andrés Arcos Rojas");
  });

  it('Login con profesor', async () => {
    let res = await service.login("er.arcos@profesor.duoc.cl", "profesor123");
    expect(res.user.uid).toEqual("NeIKnsD1IhREsIjCysdtRyBaPDS2");
    service.logout();
  });

});
