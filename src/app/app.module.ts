import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule, LogLevel } from "angular-auth-oidc-client";
import { EventTypes, PublicEventsService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8000/realms/VIPCOAT-Realm',
        redirectUrl: 'http://localhost:10001/',
        clientId: 'VIPCOAT platform',
        scope: 'openid profile email offline_access',
        responseType: "code",
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug
      }
    })
  ],
  providers: [],
})
export class AppModule {   
  
  constructor(
    private injector: Injector,
    private readonly eventService: PublicEventsService,
  ) {}

  ngDoBootstrap() {
    this.eventService
      .registerForEvents()
      .pipe(
        filter((notification) => notification.type === EventTypes.ConfigLoaded)
      )
      .subscribe((config) => {
        console.log('ConfigLoaded', config);
      })
      
    const ce = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('custom-mf-element', ce);
  }

}
