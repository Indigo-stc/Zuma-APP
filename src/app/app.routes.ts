import { Routes } from '@angular/router';
import { TeamsComponent } from './pages/teams/teams.component';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { TeamInfoComponent } from './pages/team-info/team-info.component';
import { TournamentInfoComponent } from './pages/tournament-info/tournament-info.component';

export const routes: Routes = [
    // { path: "", component: AppComponent },
    { path: "teams", component: TeamsComponent },
    { path: "team/:id", component: TeamInfoComponent },
    { path: "tournaments", component: TournamentsComponent },
    { path: "tournaments/:id", component: TournamentInfoComponent }
];
