import { Component, OnInit, inject } from '@angular/core';
import { TournamentCardComponent } from '../../componets/tournament-card/tournament-card.component';
import { Tournament } from '../../shared/models/tournament';
import { TournamentsService } from '../../shared/_services/tournaments.service';
import { TournamentFormComponent } from '../../componets/tournament-form/tournament-form.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [TournamentCardComponent, MatDialogModule],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent implements OnInit {

  tournaments?: Tournament[];

  _tournametService = inject(TournamentsService);

  router = inject(Router);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.listTournaments()
  }

  listTournaments() {
    this._tournametService.getAll().subscribe({
      next: response => {
        this.tournaments = response
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openTournamentForm() {
    const dialogRef = this.dialog.open(TournamentFormComponent, {
      width: '800px', // Configura el ancho
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listTournaments();
      }
    });
  }
  getInfo(tournament: Tournament) {
    this.router.navigate(['/tournaments/', tournament.id]); 
  }

}
