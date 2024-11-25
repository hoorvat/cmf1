import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  constructor(private oidcSecurityService: OidcSecurityService) { }
  check_auth(): AuthCheck {
    let authCheck: AuthCheck = {};
    this.oidcSecurityService.getPayloadFromIdToken().subscribe((payload) => {
      if(JSON.stringify(payload) !== "{}") {
        console.log(payload)
        authCheck.firstName = payload.given_name
        authCheck.lastName = payload.family_name
        authCheck.sub = payload.sub
        authCheck.preferredUserName = payload.preferred_username
        authCheck.email = payload.email
        authCheck.isLoggedIn = true
      }
    });  
    return authCheck
  }
}

export interface UserClaims {
	name: string;
	preferred_username: string;
	sub: string;
}

export interface AuthCheck {
	isLoggedIn?: boolean;
	isAdmin?: boolean;
	sub?: string;
	preferredUserName?: string;
	name?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
  }
