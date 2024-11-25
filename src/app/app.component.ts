import { Component } from '@angular/core';
import { AuthCheck } from './services/auth/authenticate.service';
import { AuthenticateService } from './services/auth/authenticate.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = "custom_mf"
  authCheck: AuthCheck = {};

  constructor(
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.authCheck = this.authenticateService.check_auth()
  }
}
