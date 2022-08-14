export interface VideoDto{

  id: string;
  title: string;
  videoStatus: string;
  description: string;

  userId: string;
  userName: string;

  videoUrl: string;
  thumbnailUrl: string;

  likeCount: number;
  dislikeCount: number;
  viewCount: number;

  tags: Array<string>;
}
