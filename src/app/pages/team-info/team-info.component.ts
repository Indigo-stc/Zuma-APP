import { Component, OnInit, inject } from '@angular/core';
import { TeamFormComponent } from '../../componets/team-form/team-form.component';
import { TeamsService } from '../../shared/_services/teams.service';
import { Team } from '../../shared/models/team';
import { ActivatedRoute, Router } from '@angular/router';
import { Roster } from '../../shared/models/roster';
import { RosterService } from '../../shared/_services/roster.service';
import { PlayerFormComponent } from '../../componets/player-form/player-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../../shared/models/player';
import { TeamCardComponent } from '../../componets/team-card/team-card.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-team-info',
  standalone: true,
  imports: [TeamFormComponent, TeamCardComponent],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css'
})
export class TeamInfoComponent implements OnInit {

  _teamService = inject(TeamsService);
  _rosterService = inject(RosterService);

  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);

  id?: number;
  roster?: Roster[];
  team?: Team;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getTeam(this.id);
      this.getRosterByTeamIdActive(this.id);
    });
  }

  getTeam(id: number): void {
    this._teamService.getById(id).subscribe({
      next: response => {
        this.team = response
      }
    })
  }

  getRosterByTeamIdActive(id: number) {
    this._rosterService.getRosterByTeamIdActive(id).subscribe({
      next: response => {
        this.roster = response
        console.log(this.roster);
      }
    })
  }

  openDialogCreatePlayer(): void {
    const teamId = this.id
    const dialogRef = this.dialog.open(PlayerFormComponent, {
      width: '100%',
      data: { teamId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
      if (result) {
        console.log(result);
        this.getRosterByTeamIdActive(this.id!);
      }
    });
  }

  ageCalculator(player: Player): number {
    if (player) {
      const convertAge = new Date(player.birth!);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
    }
    return 0;
  }

  openDialogUpdateTeam() {
    const team = this.team
    const dialogRef = this.dialog.open(TeamFormComponent, {
      data: { team }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTeam(this.id!);
      }
    });
  }

}
