export interface Comment {
  _id: string;
  content?: string;
  image?: string;
  commentCreator: {
    _id: string;
    name: string;
    photo: string;
  };
  post: string;
  parentComment: string | null;
  likes: any[];
  createdAt: string;
  repliesCount: number;
}