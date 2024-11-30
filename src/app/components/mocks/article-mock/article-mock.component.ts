import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-article-mock',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    CommonModule
  ],
  templateUrl: './article-mock.component.html',
  styleUrl: './article-mock.component.scss'
})
export class ArticleComponentMock {

}
