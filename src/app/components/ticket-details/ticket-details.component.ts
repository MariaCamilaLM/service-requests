import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import {
  statusToPercentage,
  Ticket,
  TicketStatus,
} from '../../models/ticket.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { Comment } from '../../models/comment.model';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { PusherService } from '../../services/pusher.service';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Blob } from 'buffer';

@Component({
  standalone: true,
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  imports: [
    MatCardModule,
    CommonModule,
    TranslatePipe,
    MatList,
    MatListItem,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    FileUploadComponent,
    MatSelect,
    MatOption,
    FormsModule,
    MatButton,
  ],
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticket!: Ticket;
  statusToPercentage = statusToPercentage;
  newComment: string = '';
  ticketStatusOptions: string[] = Object.values(TicketStatus);
  selectedStatus: string = 'Open';
  ticketId: string = '';
  comments: Comment[] = [];
  selectedFiles: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private pusherService: PusherService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    this.ticketId = ticketId === null ? '' : ticketId;
    if (this.ticketId) {
      this.listenForEvents();
      this.loadTicket();
    }
  }

  loadTicket(): void {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (data: Ticket) => {
        this.ticket = data;
      },
      error: (error: any) => {
        console.error('Error fetching ticket details:', error);
      },
    });
  }

  openFile(file: any, index: number, ticketId: any) {
    this.ticketService.downloadFile(file.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `File ${index + 1} for ticket ${ticketId}.${
          file.file_type
        }`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
      },
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      const newComment: Comment = {
        comment_text: this.newComment,
      };

      this.ticketService.addComment(newComment, this.ticketId).subscribe({
        next: () => {
          this.newComment = '';
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        },
      });
    }
  }

  listenForEvents(): void {
    const channel = `ticket.${this.ticketId}`;
    const comments = 'CommentPosted';
    const files = 'FileUploaded';
    const changes = 'TicketUpdated';

    this.pusherService.subscribeToChannel(channel);
    this.pusherService.bindToEvent(comments, (data) => {
      this.ticket.comments.push(data.comment);
    });

    this.pusherService.bindToEvent(files, (data) => {
      this.ticket.files?.push(data.file);
    });

    this.pusherService.bindToEvent(changes, () => {
      this.loadTicket();
    });
  }

  onFilesSelected(files: File[]) {
    this.selectedFiles = files;
  }

  uploadFiles() {
    const formData = new FormData();

    this.selectedFiles.forEach((file) => {
      formData.append('files[]', file);
    });

    this.ticketService.uploadFile(formData, this.ticketId).subscribe({
      next: () => {
        this.selectedFiles = [];
      },
      error: () => {},
    });
  }

  changeTicketStatus() {
    const ticketStatusMap = Object.entries(TicketStatus).find(([, status]) => status === this.selectedStatus);
    this.ticket.status = ticketStatusMap ? ticketStatusMap[1] : TicketStatus.Open;
    console.log(ticketStatusMap);
    this.ticketService.changeStatus(this.ticket).subscribe({
      error: () => {},
      next: () => {},
    });
  }

  isEngineer(): boolean {
    return this.authService.getRole() === 'engineer';
  }

  ngOnDestroy(): void {
    const channel = `ticket.${this.ticketId}`;
    this.pusherService.unsubscribeFromChannel(channel);
  }

  assignToMe() {
    this.ticketService.assignToMe(this.ticketId).subscribe({
      next: () => {},
      error: () => {},
    });
  }

}
