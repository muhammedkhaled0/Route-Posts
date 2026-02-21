export interface UserResI {
    success:boolean,
    message:string,
    data:{
        user:UserI
    }
}

export interface UserI {
  cover: string
  followers: any[]
  _id: string
  name: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  createdAt: string
  bookmarks: string[]
  following: string[]
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}
