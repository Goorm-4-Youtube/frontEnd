import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {


  videoId!: string;
  videoUrl!: string;
  videoTitle!: string;
  videoDescription!: string;
  tags: Array<string> = [];
  videoAvailable: boolean = false;
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount : number = 0;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;
  uploader_id!: string;
  uploader_name!: string;


  constructor(private activatedRoute : ActivatedRoute, private userService: UserService,
              private videoService: VideoService, private router: Router) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.videoAvailable = true;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.tags = data.tags
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
      this.viewCount = data.viewCount;
      this.uploader_id = data.userId;
      this.uploader_name = data.userName;
    })
  }

  ngOnInit(): void {
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(data => {
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
    })
  }

  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe(data => {
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
    })
  }


  subscribeToUser() {
    this.userService.registerUser();

    let userId = this.userService.getUserId();
    this.userService.subscribeToUser(userId).subscribe(data =>{
        this.showUnSubscribeButton = true;
        this.showSubscribeButton =false;
    });
  }

  unSubscribeToUser() {
    this.userService.registerUser();
    let userId = this.userService.getUserId();
    this.userService.unSubscribeToUser(userId).subscribe(data =>{
      this.showSubscribeButton = true;
      this.showUnSubscribeButton = false;
    });
  }
}
