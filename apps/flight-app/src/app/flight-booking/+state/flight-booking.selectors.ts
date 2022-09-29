import {createFeatureSelector, createSelector, select} from "@ngrx/store";
import {State} from "./flight-booking.reducer";
import {pipe} from "rxjs";
import {map} from "rxjs/operators";


// Create feature selector
export const selectFlightBooking = createFeatureSelector<State>('flightBooking');

// Use feature selector to get data from feature branch
export const selectFlights = createSelector(selectFlightBooking, s => s.flights);

export const negativeList = createSelector(selectFlightBooking, s => s.negativeList);

export const selectedFilteredFlights = createSelector(
  selectFlights,
  negativeList,
  (flights, negativeList) => flights.filter(f => !negativeList.includes(f.id))
);

export const selectFlightsWithParam = (blockedFlights: number[]) => createSelector(
  selectFlights,
  (flights) => flights.filter(f => !blockedFlights.includes(f.id))
);

export const selectPassengers = createSelector(
  selectFlightBooking,
  (state) => state.passenger
);

export const selectBookings = createSelector(
  selectFlightBooking,
  (state) => state.bookings
);

export const selectUser = createSelector(
  selectFlightBooking,
  (state) => state.user
);

export const selectActiveUserFlights = createSelector(
  // Selectors:
  selectFlights,
  selectBookings,
  selectUser,
  // Projector:
  (flights, bookings, user) => {
    const activeUserPassengerId = user.passengerId;
    const activeUserFlightIds = bookings
      .filter(b => b.passengerId === activeUserPassengerId)
      .map(b => b.flightId);
    const activeUserFlights = flights
      .filter(f => activeUserFlightIds.includes(f.id));
    return activeUserFlights;
  }
);

export const selectDelayedRxJSOperator = () =>
  pipe(
    // RxJS operator to select state from store
    select(selectFlights),
    // RxJS map operator
    map(flights =>
      // Array filter function
      flights.filter(f => f.delayed)
    )
  );

export const selectItemsByFilter =
  <T, K>(
    mapFn: (state: T) => Array<K>,
    filter: (item: K) => boolean
  ) => pipe(
    // RxJS operator to select state from store
    select(mapFn),
    // RxJS map operator
    map(arr =>
      // Array filter function
      arr.filter(filter)
    )
  );
