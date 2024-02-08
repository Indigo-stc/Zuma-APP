import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../../shared/models/player';
import { PlayerService } from '../../shared/_services/player.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { validateBirthDate } from '../../shared/checkers/validateDate';
import { RosterService } from '../../shared/_services/roster.service';
import { Roster } from '../../shared/models/roster';
import { Team } from '../../shared/models/team';
// import { validarCedula } from '../../shared/checkers/validateDni';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class PlayerFormComponent implements OnInit {

  fb = inject(FormBuilder);
  player?: Player;

  formPlayer?: FormGroup
  _playerService = inject(PlayerService)
  _rosterService = inject(RosterService)

  constructor(public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {
    this.player = this.data.player;
    if(this.player && this.data.teamId) {
      this.formPlayer = this.startForm(this.player);
    } else {
      this.formPlayer = this.startForm(new Player());
    }
  }

  startForm(player: Player): FormGroup {
    return this.fb.group({
      dni: [player?.dni ?? '', [Validators.required, Validators.minLength(10)]],
      name: [player?.name ?? '', [Validators.required, Validators.maxLength(30)]],
      surname: [player?.surname ?? '', [Validators.required, Validators.maxLength(30)]],
      birth: [player?.birth ?? '', [Validators.required, validateBirthDate]],
      // gender: [this.player?.gender, [Validators.required, Validators.maxLength(50)]],
      // comments: [this.player?.comments, [Validators.required, Validators.maxLength(50)]],
      email: [player?.email ?? '', [Validators.required, Validators.maxLength(50)]],
      phone: [player?.phone ?? '', [Validators.required]]
    });
  }
  

  markAllFieldsAsTouched() {
    Object.values(this.formPlayer!.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  savePlayer() {
    if(this.formPlayer?.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    if(!this.player && this.data.teamId) {
      const roster: Roster = new Roster();
      const team: Team = new Team();
      team.id = parseInt(this.data.teamId)
      const player: Player = this.formPlayer?.value;
      player.active = true;
      roster.player = player;
      roster.team = team;
      roster.active = true;
      this.asignarPlayer(roster);
    } else if (this.player) {
      const player: Player = this.formPlayer?.value;
      this.updatePlayer(player);
    }
  }

  asignarPlayer(player: Roster) { // here I create the player and asign it to the team
    this._rosterService.create(player).subscribe({
      next: response => {
        this.dialogRef.close(true);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  updatePlayer(player: Player) {
    this._playerService.update(player.id!, player).subscribe({
      next: response => {
        this.dialogRef.close(true);
      },
      error: error => {
        console.log(error);
      }
    });
  }
}