export interface IUserSliceState {
  user_id: string | null;
  email: string | null;
  token: string | null; 
}

export interface IPhoto {
  id: string;
  image: string;
  name: string;
}