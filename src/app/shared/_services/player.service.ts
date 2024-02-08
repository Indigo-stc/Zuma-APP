import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends CrudService<Player> {

  PLAYER_PATH = '/player';

  constructor() {
    super('/player');
  }

}
