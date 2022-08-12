import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentDto} from "./comment-dto";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {



  constructor(private httpClient: HttpClient) { }


  postComment(commentDto: any,videoId: string): Observable<any>{
    return this.httpClient.post<any>("/api/videos/" + videoId+"/comment",commentDto);
  }

  getAllComments(videoId: string): Observable<Array<CommentDto>> {
    return this.httpClient.get<CommentDto[]>("/api/videos/"+videoId+"/comment");

  }

  deleteComment(videoId: string, num: number){
    return this.httpClient.delete("/api/videos/" + videoId +"/"+num +"/comment/delete");
  }

  deleteVideo(videoId: string){
    return this.httpClient.post("/api/videos/" + videoId + "/comment/delete",null);
  }
}
