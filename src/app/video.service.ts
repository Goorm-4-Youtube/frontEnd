import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "./upload-video/UploadVideoResponse";
import {VideoDto} from "./video-dto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);

    return this.httpClient.post<UploadVideoResponse>(environment.apiUrl+"/api/videos/",formData);

  }

  uploadThumbnail(fileEntry: File,videoId: string): Observable<string>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId',videoId);
    console.log(videoId,fileEntry);
    return this.httpClient.post(environment.apiUrl+"/api/videos/thumbnail",formData,{
      responseType: 'text'
    });


  }

  getVideo(videoId: string): Observable<VideoDto>{
    return this.httpClient.get<VideoDto>(environment.apiUrl+"/api/videos/" + videoId);
  }

  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    console.log(videoMetaData);
    return this.httpClient.put<VideoDto>(environment.apiUrl+"/api/videos",videoMetaData);
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>(environment.apiUrl+"/api/videos");
  }

  searchVideos(query: string): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>(environment.apiUrl+"/api/videos/"+query+"/search");
  }

  getPublicVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>(environment.apiUrl+"/api/videos/public");
  }

  getMyVideos(userId: string): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>(environment.apiUrl+"/api/videos/"+userId+"/videos");
  }

  likeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>(environment.apiUrl+"/api/videos/"+ videoId + "/like",null);

  }

  dislikeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>(environment.apiUrl+"/api/videos/"+ videoId + "/disLike",null);

  }

  deleteVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>(environment.apiUrl+"/api/videos/"+ videoId+ "/delete",null);
  }


}
