import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsService } from '../../shared/_services/teams.service';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { Team } from '../../shared/models/team';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css'
})
export class TeamFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private _teamsService = inject(TeamsService);

  formTeam?: FormGroup; 
  team?: Team;

  constructor(public dialogRef: MatDialogRef<TeamFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {
    if(this.data && this.data.team) {
      this.team = this.data.team;
      this.formTeam = this.startForm(this.team!);
    } else {
      this.formTeam = this.startForm(new Team());
    }
  }

  startForm(team: Team): FormGroup {
    return this.fb.group({
      name: [team.name ?? '', [Validators.required, Validators.maxLength(30)]],
      description: [team.description ?? '', [Validators.required, Validators.maxLength(120)]],
      email: [team.email ?? '', [Validators.required, Validators.email, Validators.maxLength(50)]]
    });
  }
  

  isInvalidForm(controlName: string, ... issues: string[]): boolean {
    const control = this.formTeam?.get(controlName);
    console.log(control)
    if (control?.touched) {
      for (const issue of issues) {
        if (control?.hasError(issue)) {
          return true;
        }
      }
    }
    return false;
  }

  markAllFieldsAsTouched() {
    Object.values(this.formTeam!.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  updateTeam() {
    if(this.formTeam?.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    if(!this.team) {
      const team: Team = this.formTeam?.value;
      team.active = true;
      this._teamsService.create(team).subscribe({
        next: response => {
          this.dialogRef.close(true);
        }
      })
    } else {
      const team: Team = this.formTeam?.value;
      team.id = this.team.id;
      this._teamsService.update(team.id!, team).subscribe({
        next: response => {
          this.dialogRef.close(true);
        }
      })
    }
  }

  closeTeamForm() {
    this.dialogRef.close(false);
  }


}
