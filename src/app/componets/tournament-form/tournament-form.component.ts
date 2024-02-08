import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentsService } from '../../shared/_services/tournaments.service';
import { Tournament } from '../../shared/models/tournament';
import { MatSelectModule } from '@angular/material/select';
import { Sport } from '../../shared/models/sport';
import { SportService } from '../../shared/_services/sport.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-tournament-form',
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
  imports: [ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule],
  templateUrl: './tournament-form.component.html',
  styleUrl: './tournament-form.component.css'
})
export class TournamentFormComponent implements OnInit {

  fb = inject(FormBuilder);
  formTournament?: FormGroup;

  sportSelected?: Sport

  tournament?: Tournament;
  sports?: Sport[];
  
  _tournamentService = inject(TournamentsService);
  _sportService = inject(SportService);

  constructor(public dialogRef: MatDialogRef<TournamentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data && this.data.tournament) {
      this.tournament = this.data.tournament;
      this.formTournament = this.startForm(this.tournament!); 
      this.listSports();
    } else {
      this.formTournament = this.startForm(new Tournament());
      this.listSports();
    }
  }

  startForm(tournament: Tournament): FormGroup {
    return this.fb.group({
      name: [tournament.name ?? '', [Validators.required, Validators.maxLength(30)]],
      startDate: [tournament.startDate ?? '', [Validators.required]],
      finishDate: [tournament.finishDate ?? '', [Validators.required]],
      sport: [tournament.sport ?? '', Validators.required]
    })
  }

  listSports() {
    this._sportService.getAll().subscribe({
      next: (data) => {
        this.sports = data;
        console.log(this.sports);
      },
      error: (error) => {
        
      }
    })
  }

  updateTournament() {
    if(this.formTournament?.invalid) {
      this.markAllFieldsAsTouched();
      return
    }

    if(!this.tournament) {
      const tournament = this.formTournament?.value;
      console.log(tournament);
      this._tournamentService.create(this.formTournament?.value).subscribe({
        next: (data) => {
          console.log(data);
          this.dialogRef.close(true);
        }
      })
    }
    
    
  }

  markAllFieldsAsTouched() {
    Object.values(this.formTournament!.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
