import {Component} from '@angular/core';
import {AuthLibService} from "@flight-workspace/shared/auth-lib";

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'shell';

  constructor(private authService: AuthLibService) {
    this.authService.login('Max', '');
  }
}
