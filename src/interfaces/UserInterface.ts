export interface User {
  _id: string;
  email: string;
  image: string;
  name: string;
  city: string;
  friends?: [string];
  role: string;
}
