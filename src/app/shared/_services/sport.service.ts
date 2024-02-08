import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class SportService extends CrudService<Sport> {

  SPORT_PATH = '/sport';

  constructor() {
    super('/sport');
  }
}
