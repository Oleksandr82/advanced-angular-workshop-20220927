import * as FlightBookingActions from './flight-booking.actions';
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {FlightService} from "@flight-workspace/flight-lib";
import {map} from "rxjs/operators";

@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() => this.actions$.pipe(
    ofType(FlightBookingActions.flightsLoad),
    switchMap(a => this.flightService.find(a.from, a.to, a.urgent).pipe(
      map(flights => FlightBookingActions.flightsLoaded({flights})),
      catchError(err => of(FlightBookingActions.flightsLoadedError({ error: err })))
    )),
  ));
  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
