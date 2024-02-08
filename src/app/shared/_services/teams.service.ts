import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Team } from '../models/team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends CrudService<Team> {

  TEAM_PATH = '/team';

  constructor() {
    super('/team');
  }
  
}
