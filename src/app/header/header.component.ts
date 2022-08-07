import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  search : String ="";

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logOff() {
    this.oidcSecurityService.logoffAndRevokeTokens();
    this.oidcSecurityService.logoffLocal();
  }

  query()
  {
    this.router.navigateByUrl("/")
      .then(()=> {
        this.router.navigateByUrl("/search-video/" + this.search);
      });
  }
}
