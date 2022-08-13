export interface VideoDto{

  id: string;
  title: string;
  userId: string;
  userName: string;
  description: string;
  tags: Array<string>;
  videoUrl: string;
  videoStatus: string;
  thumbnailUrl: string;
  likeCount: number;
  dislikeCount: number;
  viewCount: number;
}
