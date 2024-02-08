import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService extends CrudService<Tournament> {

  TOURNAMENT_PATH = '/tournament';

  constructor() {
    super('/tournament');
  }
  
}
