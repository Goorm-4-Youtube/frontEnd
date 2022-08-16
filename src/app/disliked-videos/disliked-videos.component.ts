import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {UserService} from "../user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-disliked-videos',
  templateUrl: './disliked-videos.component.html',
  styleUrls: ['./disliked-videos.component.css']
})
export class DislikedVideosComponent implements OnInit {

  dislikedVideos: Array<VideoDto> = [];

  isAuthenticated: boolean = false;
  constructor(private oidcSecurityService: OidcSecurityService,private videoService: VideoService, private userService: UserService) { }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) =>{
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated){
        this.userService.getDisLikedVideo().subscribe( response => {
          this.dislikedVideos = response;
        })
      }
    })
  }
}
