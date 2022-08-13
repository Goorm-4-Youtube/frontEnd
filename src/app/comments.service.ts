import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentDto} from "./comment-dto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {



  constructor(private httpClient: HttpClient) { }


  postComment(commentDto: any,videoId: string): Observable<any>{
    return this.httpClient.post<any>(environment.apiUrl+"/api/videos/" + videoId+"/comment",commentDto);
  }

  getAllComments(videoId: string): Observable<Array<CommentDto>> {
    return this.httpClient.get<CommentDto[]>(environment.apiUrl+"/api/videos/"+videoId+"/comment");

  }

  deleteComment(videoId: string, num: number){
    return this.httpClient.delete(environment.apiUrl+"/api/videos/" + videoId +"/"+num +"/comment/delete");
  }

  deleteVideo(videoId: string){
    return this.httpClient.post(environment.apiUrl+"/api/videos/" + videoId + "/comment/delete",null);
  }
}
