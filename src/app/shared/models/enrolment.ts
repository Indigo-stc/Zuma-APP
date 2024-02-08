import { Team } from "./team";
import { Tournament } from "./tournament";

export class Enrolment {

    id?: number;
    cost?: number;
    active?: boolean;
    dateEnrolemnt?: Date;

    team?: Team;
    tournament?: Tournament;

}
