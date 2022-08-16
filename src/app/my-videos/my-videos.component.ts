import { Component, OnInit } from '@angular/core';
import {VideoService} from "../video.service";
import {VideoDto} from "../video-dto";
import {UserService} from "../user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent implements OnInit {

  myVideos : Array<VideoDto> = [];

  isAuthenticated: boolean = false;
  constructor(private oidcSecurityService: OidcSecurityService, private videoService: VideoService,private userService: UserService) {  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) =>{
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated){
        this.videoService.getMyVideos(this.userService.getUserId()).subscribe(response => {
          this.myVideos = response;
        })
      }
    })
  }
}
