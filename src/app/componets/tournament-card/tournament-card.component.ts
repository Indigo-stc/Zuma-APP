import { Component, Input } from '@angular/core';
import { Tournament } from '../../shared/models/tournament';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tournament-card',
  standalone: true,
  imports: [MatCardModule, DatePipe, CommonModule ],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.css'
})
export class TournamentCardComponent {

  @Input({required: true}) tournament!: Tournament;

}
