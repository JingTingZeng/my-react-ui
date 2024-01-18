export interface TodoData {
  id: string;
  task: string;
  complete: boolean;
}

export enum TodoFilter {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETE = "Complete",
}