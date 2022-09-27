import { Component } from '@angular/core';
import { Passenger, SearchFacade } from '@flight-workspace/passenger/domain';
import {AuthLibService} from "@flight-workspace/shared/auth-lib";

@Component({
  selector: 'passenger-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  firstname = '';
  name = 'Smith';
  passengerList$ = this.searchFacade.passengerList$;
  user = this.authService.user;
  selectedPassenger: Passenger | undefined;

  constructor(private authService: AuthLibService, private searchFacade: SearchFacade) {}

  load(): void {
    this.searchFacade.load(this.name, this.firstname);
  }

  toggleSelection(p: Passenger) {
    this.selectedPassenger = p;
  }
}
