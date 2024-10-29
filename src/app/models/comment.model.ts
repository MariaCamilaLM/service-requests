import { User } from "./user.model";

export interface Comment {
    user?: User;
    id?: number;
    ticket_id?: number;
    comment_text: string;
    created_at?: string;
    updated_at?: string;
}