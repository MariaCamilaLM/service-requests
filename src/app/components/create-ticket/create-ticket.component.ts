import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatOption,
    MatSelect,
    MatCheckboxModule,
    TranslatePipe,
    FileUploadComponent,
    MatButton,
  ],
})
export class CreateTicketComponent {
  createTicketForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.createTicketForm = this.fb.group({
      title: ['', [Validators.required]],
      issue_description: ['', [Validators.required]],
      serial_number: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      is_under_warranty: [false],
      priority: ['', [Validators.required]],
      accept_conditions: [false, [Validators.requiredTrue]],
    });
  }

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onSubmit(): void {
    if (this.createTicketForm.valid) {
      const formData = new FormData();
      const ticketData = this.createTicketForm.value;

      Object.keys(ticketData).forEach((key) => {
        if (typeof ticketData[key] === 'boolean') {
          formData.append(key, ticketData[key] ? '1' : '0');
        } else {
          formData.append(key, ticketData[key]);
        }
      });

      this.selectedFiles.forEach((file) => {
        formData.append('files[]', file);
      });

      this.ticketService.createTicket(formData).subscribe({
        next: () => {
          this.router.navigate(['/client']);
        },
        error: (error) => {
          console.error('Error creating ticket:', error);
        },
      });
    }
  }
}
