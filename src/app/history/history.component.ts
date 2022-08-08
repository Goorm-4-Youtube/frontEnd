import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {UserService} from "../user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  viewedVideos: Array<VideoDto> = [];

  isAuthenticated: boolean = false;
  constructor(private oidcSecurityService: OidcSecurityService,private videoService: VideoService, private userService: UserService) { }
  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) =>{
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated){
        this.userService.getHistory().subscribe(response => {
          this.viewedVideos = response;
        })
      }
    })
  }

}
