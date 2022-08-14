import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'https://goormtube.us.auth0.com',
      redirectUrl: '/callback',
      clientId: 'WzqO1mFiSzQmHHF9udQXCVDVfR8KIgbg',
      scope: 'openid profile offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      secureRoutes: [environment.apiUrl+'/api'],
      customParamsAuthRequest : {
        audience: environment.apiUrl + '/api'
      }
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule {}
