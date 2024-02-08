import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Enrolment } from '../models/enrolment';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class EnrolmentService extends CrudService<Enrolment> {

  ENROLMENT_PATH = '/enrolment';

  constructor() {
    super('/enrolment');
  }

  getTeamsByTournamentId(id: number): Observable<Enrolment[]> {
    console.log("entro al servicio")
    return this._http.get<Enrolment[]>(`${this.endPoint}/tournament/${id}`)
  }

}
