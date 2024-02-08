import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Roster } from '../models/roster';

@Injectable({
  providedIn: 'root'
})
export class RosterService extends CrudService<Roster> {

  ROSTER_PATH = '/roster';

  constructor() {
    super('/roster');
  }

  getRosterByTeamIdActive(id: number) {
    return this._http.get<Roster[]>(`${this.endPoint}/team/${id}`)
  }

}
