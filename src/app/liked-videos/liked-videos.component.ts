import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {VideoService} from "../video.service";
import {UserService} from "../user.service";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent implements OnInit {

  likedVideos: Array<VideoDto> = [];

  isAuthenticated: boolean = false;
  constructor(private oidcSecurityService: OidcSecurityService, private videoService: VideoService, private userService: UserService) { }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) =>{
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated){
        this.userService.getLikedVideo().subscribe( response => {
          this.likedVideos = response;
        })
      }
    })
  }
}
