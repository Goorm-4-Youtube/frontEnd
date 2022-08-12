import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'https://goormtube.us.auth0.com/',
      redirectUrl: '/callback',
      clientId: 'OzAlzU5J9WInOnTVyQcBxPjKXFlogRlB',
      scope: 'openid profile offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      secureRoutes: ['/api'],
      customParamsAuthRequest : {
        audience: '/api'
      }
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule {}
