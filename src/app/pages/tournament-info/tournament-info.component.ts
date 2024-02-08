import { Component, OnInit, inject } from '@angular/core';
import { TournamentCardComponent } from '../../componets/tournament-card/tournament-card.component';
import { TournamentsService } from '../../shared/_services/tournaments.service';
import { EnrolmentService } from '../../shared/_services/enrolment.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Enrolment } from '../../shared/models/enrolment';
import { Tournament } from '../../shared/models/tournament';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-info',
  standalone: true,
  imports: [TournamentInfoComponent, TournamentCardComponent, CommonModule],
  templateUrl: './tournament-info.component.html',
  styleUrl: './tournament-info.component.css'
})
export class TournamentInfoComponent implements OnInit {

  _tournamentService? = inject(TournamentsService);
  _enrollmentService? = inject(EnrolmentService);

  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);

  id?: number;
  enrolments?: Enrolment[];
  tournament?: Tournament;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getTournament(this.id);
      this.getEnrolments(this.id);
    })
  }

  getEnrolments(id: number) {
    this._enrollmentService?.getTeamsByTournamentId(id).subscribe({
      next: response => {
        console.log(response)
        this.enrolments = response
      }
    })
  }

  getTournament(id: number) {
    this._tournamentService?.getById(id).subscribe({
      next: response => {
        this.tournament = response
        console.log(response)
      },
      error: error => {
        console.log("sadasdasdas")
        console.log(error)
      }
    })
  }

  openDialogUpdateTournament() {
    throw new Error('Method not implemented.');
  }

}
