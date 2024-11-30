import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatButton,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFiles: File[] = [];
  
  @Output() filesSelected = new EventEmitter<File[]>();

  triggerFileUpload(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*';

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.selectedFiles = Array.from(target.files);
        this.filesSelected.emit(this.selectedFiles);
      }
    };

    input.click();
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      const files = event.dataTransfer.files;
      this.selectedFiles = Array.from(files);
      this.filesSelected.emit(this.selectedFiles);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
