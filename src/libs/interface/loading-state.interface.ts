import { Status } from "../enum/status.enum";

export interface LoadingState {
  state: Status,
  error: string | undefined;
}