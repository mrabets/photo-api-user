import { integerPropType } from "@mui/utils";

export interface IUserSliceState {
  id: number | null;
  email: string | null;
  token: string | null; 
}

export interface IPhoto {
  id: number;
  image: string;
  name: string;
}