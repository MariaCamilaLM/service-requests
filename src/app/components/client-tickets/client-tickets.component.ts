import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { statusToPercentage, Ticket } from '../../models/ticket.model';
import { MatTableModule } from '@angular/material/table';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Router } from '@angular/router';
import { TicketsTableComponent } from "../tickets-table/tickets-table.component";

@Component({
  selector: 'app-client-tickets',
  templateUrl: './client-tickets.component.html',
  styleUrls: ['./client-tickets.component.scss'],
  standalone: true,
  imports: [MatTableModule, TranslatePipe, TicketsTableComponent],
})
export class ClientTicketsComponent {
  
}
