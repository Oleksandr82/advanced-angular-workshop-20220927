import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./flight-booking.reducer";


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
