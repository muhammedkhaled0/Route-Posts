import { getUserToken } from "../helpers/GetUserToken";

export async function getAllPostCommentsApi(postId: string) {
  const token = await getUserToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments?page=1&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const data: any = await res.json();
  return data;
}
export async function createCommentsApi(postId: string, formData: FormData) {
  const token = await getUserToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  const data: any = await res.json();
  return data;
}
export async function updateCommentsApi(
  postId: string,
  commentId: string,
  formData: FormData,
) {
  const token = await getUserToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  const data: any = await res.json();
  return data;
}
export async function createReplyApi(
  postId: string,
  commentId: string,
  formData: FormData,
) {
  const token = await getUserToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  const data: any = await res.json();
  return data;
}
export async function getAllCommentsRepliesApi(
  postId: string,
  commentId: string,
) {
  const token = await getUserToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const data: any = await res.json();
  return data;
}
export async function putCommentLike(postId: string, commentId: string) {
  const token = await getUserToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}/like`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const data: any = await res.json();
  return data;
}
export async function deleteCommentApi(postId: string, commentId: string) {
  const token = await getUserToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const data: any = await res.json();
  return data;
}
