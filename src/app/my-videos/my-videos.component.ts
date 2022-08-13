import { Component, OnInit } from '@angular/core';
import {VideoService} from "../video.service";
import {VideoDto} from "../video-dto";
import {UserService} from "../user.service";

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent implements OnInit {

  myVideos : Array<VideoDto> = [];

  constructor(private videoService: VideoService,private userService: UserService) {

  }

  ngOnInit(): void {

    this.videoService.getMyVideos(this.userService.getUserId()).subscribe(response => {
      this.myVideos = response;
    });
  }

}
