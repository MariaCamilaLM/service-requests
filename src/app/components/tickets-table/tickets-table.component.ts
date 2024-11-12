import { Component, Input, input, OnInit } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatTableModule } from '@angular/material/table';
import { statusToPercentage, Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { TranslationService } from '../../services/translation.service';
import { Router } from '@angular/router';
import { PusherService } from '../../services/pusher.service';

@Component({
  selector: 'app-tickets-table',
  standalone: true,
  imports: [MatTableModule, TranslatePipe],
  templateUrl: './tickets-table.component.html',
  styleUrl: './tickets-table.component.scss',
})
export class TicketsTableComponent implements OnInit {
  @Input()
  role!: string;
  tickets: Ticket[] = [];
  translations: any = {};
  statusToPercentage = statusToPercentage;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private pusher: PusherService
  ) {}

  ngOnInit(): void {
    this.listerForEvents();
    this.loadTickets();
  }

  loadTicketsClient(): void {
    this.ticketService.getTicketsClient().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
    });
  }

  loadTicketsEngineer(): void {
    this.ticketService.getTicketsEnginner().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
      error: (error) => {},
    });
  }

  loadUnassignedTickets(): void {
    this.ticketService.getUnassignedTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
      error: (error) => {},
    });
  }

  showTicket(ticketId: number) {
    this.router.navigate(['ticket', ticketId]);
  }

  listerForEvents(): void {
    const channel = 'tickets';
    const ticketUpdated = 'TicketUpdated';
    const ticketCreated = 'TicketCreated';
    this.pusher.subscribeToChannel(channel);
    this.pusher.bindToEvent(ticketUpdated, () => {
      this.loadTickets();
    });
    this.pusher.bindToEvent(ticketCreated, () => {
      this.loadTickets();
    });
  }

  loadTickets(): void {
    switch (this.role) {
      case 'engineer':
        this.loadTicketsEngineer();
        break;
      case 'unassigned':
        this.loadUnassignedTickets();
        break;
      default:
        this.loadTicketsClient();
        break;
    }
  }
}
