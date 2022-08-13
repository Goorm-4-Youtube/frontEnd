import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VideoDto} from "./video-dto";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string = '';
  private userName: string = '';

  constructor(private httpClient: HttpClient) { }

  subscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>(environment.apiUrl+"/api/user/subscribe/"+userId,null);
  }

  unSubscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>(environment.apiUrl+"/api/user/unSubscribe/"+userId,null);
  }


  registerUser() {
     this.httpClient.get<Array<string>>(environment.apiUrl+"/api/user/register")
       .subscribe(data=>{
         this.userId = data[0];
         this.userName = data[1];
       });
  }


  getUserId(): string {
    return this.userId;
  }

  getUserName(): string{
    return this.userName;
  }

  getHistory(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>(environment.apiUrl+"/api/user/history")
  }

  getLikedVideo(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>(environment.apiUrl+"/api/user/likedVideo")
  }


  getDisLikedVideo(): Observable<Array<VideoDto>>{
    return this.httpClient.get<Array<VideoDto>>(environment.apiUrl+"/api/user/dislikedVideo")
  }

}
