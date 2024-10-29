import { Comment } from "./comment.model";

export interface Ticket {
  files?: any[];
  title: string;
  files_count?: number;
  id?: number;
  client_id: number;
  engineer_id?: number;
  status: TicketStatus;
  priority: string;
  issue_description: string;
  equipment_number: string;
  serial_number: string;
  brand: string;
  is_under_warranty: boolean;
  accept_conditions: boolean;
  solution_description?: string;
  created_at?: Date;
  updated_at?: Date;
  comments: Comment[];
}

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Closed = 'Closed',
  OnHold = 'On Hold',
  Resolved = 'Resolved',
}

export function statusToPercentage(status: TicketStatus): number {
  switch (status) {
    case TicketStatus.Open:
      return 10;
    case TicketStatus.InProgress:
      return 50;
    case TicketStatus.OnHold:
      return 25;
    case TicketStatus.Resolved:
      return 75;
    case TicketStatus.Closed:
      return 100;
    default:
      return 0;
  }
}
