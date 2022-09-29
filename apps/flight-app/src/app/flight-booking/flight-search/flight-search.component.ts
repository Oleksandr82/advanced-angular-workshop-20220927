import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-lib';
import {Store} from "@ngrx/store";
import {flightsLoad, updateFlight} from "../+state/flight-booking.actions";
import {take} from "rxjs";
import {selectedFilteredFlights} from "../+state/flight-booking.selectors";
import {State} from "../+state/flight-booking.reducer";

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$ = this.store.select(selectedFilteredFlights);

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<State>) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  search(): void {
    if (!this.from || !this.to) return;

    // New (with NGRX effects):
    this.store.dispatch(flightsLoad({
      from: this.from,
      to: this.to,
      urgent: this.urgent
    }));

    // Old:
    // this.flightService
    //   .find(this.from, this.to, this.urgent)
    //   .subscribe({
    //     next: flights => {
    //       this.store.dispatch(flightsLoaded({flights}));
    //     },
    //     error: error => {
    //       console.error('error', error);
    //     }
    //   });
  }

  delay(): void {
    // this.flightService.delay();

    this.flights$.pipe(take(1)).subscribe(flights => {
      const flight = flights[0];

      const oldDate = new Date(flight.date);
      const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const newFlight = { ...flight, date: newDate.toISOString() };

      this.store.dispatch(updateFlight({flight: newFlight}));
    });
  }

}
