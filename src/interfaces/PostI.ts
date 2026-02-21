interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  parentComment: string | null;
  post: string;
  likes: string[];
  commentCreator: User;
}

interface SharedPost {
  _id: string;
  body: string;
  image?: string;
  privacy: string;
  user: User;
  createdAt: string;
}

export interface PostI {
  _id: string;
  body: string;
  image?: string;
  privacy: 'public' | 'private' | 'friends';
  user: User;
  createdAt: string;
  sharedPost: SharedPost | null;
  likes: string[];
  likesCount: number;
  isShare: boolean;
  sharesCount: number;
  bookmarked?: boolean;
  commentsCount?: number;
  topComment?: Comment | null;
}