import { createAction, props } from '@ngrx/store';
import {Flight} from "@flight-workspace/flight-lib";

export const flightsLoaded = createAction(
  '[FlightBooking] FlightsLoaded',
  props<{flights: Flight[]}>()
);

export const flightUpdate = createAction(
  '[FlightBooking] Update Flight',
  props<{flight: Flight}>()
);

export const flightsLoad = createAction(
  '[FlightBooking] Flights load',
  props<{from: string, to: string, urgent: boolean}>()
);

export const flightsLoadedError = createAction(
  '[FlightBooking] Flights loaded error',
  props<{ error: any }>()
);
