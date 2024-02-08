import { Component, Injectable, Input, OnInit, inject } from '@angular/core';
import { TeamCardComponent } from '../../componets/team-card/team-card.component';
import { TeamsService } from '../../shared/_services/teams.service';
import { Team } from '../../shared/models/team';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TeamFormComponent } from '../../componets/team-form/team-form.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TeamCardComponent, MatDialogModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {

  @Input() competitor?: Team;

  teams?: Team[];

  router = inject(Router);
  _teamService = inject(TeamsService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    if (!this.competitor) {
      this.listTeams();
    } else {
      this._teamService.getById(this.competitor.id!).subscribe({
        next: response => {
          this.teams = [response];
        }
      })
    }
  }

  listTeams() {
    this._teamService.getAll().subscribe({
      next: response => {
        console.log(response);
        this.teams = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  openTeamForm() {
    const dialogRef = this.dialog.open(TeamFormComponent, {
      width: '800px', // Configura el ancho
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listTeams();
      }
    });
  }

  saveTeam(team: Team) {
    this._teamService.create(team).subscribe({
      next: response => {
        console.log(response);
      }
    })
  }

  updateActive(team: Team) {
    if (team.active) {
      team.active = false;
    } else {
      team.active = true;
    }
    this._teamService.update(team.id!, team).subscribe({
      next: response => {
        console.log(response);
      }
    })
  }

  getRoster(team: Team) {
    this.router.navigate(['/team/', team.id]); 
  }
}
