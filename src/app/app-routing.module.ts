import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "./save-video-details/save-video-details.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {HomeComponent} from "./home/home.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {LikedVideosComponent} from "./liked-videos/liked-videos.component";
import {HistoryComponent} from "./history/history.component";
import {FeaturedComponent} from "./featured/featured.component";
import {CallbackComponent} from "./callback/callback.component";
import {MyVideosComponent} from "./my-videos/my-videos.component";
import {DislikedVideosComponent} from "./disliked-videos/disliked-videos.component";
import {SearchVideoComponent} from "./search-video/search-video.component";

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'callback', component: CallbackComponent,
      },

      {
        path: 'disliked-videos', component: DislikedVideosComponent,
      },



      {
        path: 'featured', component: FeaturedComponent,
      },

      {
        path: 'subscriptions',component:SubscriptionsComponent,

      },
      {
        path: 'history', component: HistoryComponent,
      },
      {
        path: 'search-video/:query', component:SearchVideoComponent,
      },

      {
        path: 'liked-videos', component: LikedVideosComponent,
      },

      {
        path: 'my-videos', component: MyVideosComponent,
      },

    ]
  },



  {
    path: 'upload-video',component:UploadVideoComponent,

  },

  {
    path: 'save-video-details/:videoId', component:SaveVideoDetailsComponent,

  },


  {
    path: 'video-details/:videoId', component:VideoDetailComponent,

  },
  {
    path: 'callback', component:CallbackComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
