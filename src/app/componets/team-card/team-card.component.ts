import { Component, Input } from '@angular/core';
import { Team } from '../../shared/models/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.css',
})
export class TeamCardComponent {

  @Input({required: true}) team: Team = new Team();

  constructor() {}

}
