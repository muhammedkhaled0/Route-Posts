export interface SuccessLoginResponse {
  success: true
  message: string
  data: Data
}

interface Data {
  token: string
  tokenType: string
  expiresIn: string
  user: User
}

interface User {
  _id: string
  name: string
  email: string
  photo: string
  cover: string
}
export interface FailedLoginResponse {
    success: false,
    message: string,
    errors: string
}