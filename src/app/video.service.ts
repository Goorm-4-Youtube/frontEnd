import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {UploadVideoResponse} from "./upload-video/UploadVideoResponse";
import {VideoDto} from "./video-dto";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);

    return this.httpClient.post<UploadVideoResponse>("/api/videos/",formData);

  }

  uploadThumbnail(fileEntry: File,videoId: string): Observable<string>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId',videoId);
    console.log(videoId,fileEntry);
    return this.httpClient.post("/api/videos/thumbnail",formData,{
      responseType: 'text'
    });


  }

  getVideo(videoId: string): Observable<VideoDto>{
    return this.httpClient.get<VideoDto>("/api/videos/" + videoId);
  }

  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    console.log(videoMetaData);
    return this.httpClient.put<VideoDto>("/api/videos",videoMetaData);
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("/api/videos");
  }

  searchVideos(query: string): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("/api/videos/"+query+"/search");
  }

  getPublicVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("/api/videos/public");
  }

  getMyVideos(userId: string): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("/api/videos/"+userId+"/videos");
  }

  likeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("/api/videos/"+ videoId + "/like",null);

  }

  dislikeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("/api/videos/"+ videoId + "/disLike",null);

  }

  deleteVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("/api/videos/"+ videoId+ "/delete",null);
  }


}
