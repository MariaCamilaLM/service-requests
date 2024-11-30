import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-knowlegde-base-mock',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    TranslatePipe,
    MatButton
  ],
  templateUrl: './knowlegde-base-mock.component.html',
  styleUrl: './knowlegde-base-mock.component.scss'
})
export class KnowlegdeBaseMockComponent {

}
