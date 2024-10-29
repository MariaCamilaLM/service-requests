import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TicketsTableComponent } from '../tickets-table/tickets-table.component';

@Component({
  selector: 'app-engineer-dashboard',
  standalone: true,
  imports: [
    MatTabsModule,
    TranslatePipe,
    TicketsTableComponent
  ],
  templateUrl: './engineer-dashboard.component.html',
  styleUrl: './engineer-dashboard.component.scss'
})
export class EngineerDashboardComponent {

}
