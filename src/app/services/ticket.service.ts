import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = `${environment.apiUrl}tickets`;

  constructor(private http: HttpClient) {}

  getTicketsClient(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/client`);
  }

  getTicketsEnginner(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/engineer`);
  }

  getUnassignedTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/unassigned`);
  }

  createTicket(ticket: FormData) {
    return this.http.post<any>(this.apiUrl, ticket);
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, {
      responseType: 'blob',
    });
  }

  addComment(comment: Comment, ticketId: string | null) {
    return this.http.post(`${this.apiUrl}/comment/${ticketId}`, comment);
  }

  uploadFile(files: FormData, ticketId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ticketId}/upload-file`, 
      files,
    );
  }

  assignToMe(ticketId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/assign-to-me/${ticketId}`);
  }
}
