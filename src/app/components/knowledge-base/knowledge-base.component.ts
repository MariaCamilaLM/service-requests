import { Component } from '@angular/core';
import { ArticleComponentMock } from '../mocks/article-mock/article-mock.component';
import { KnowlegdeBaseMockComponent } from '../mocks/knowlegde-base-mock/knowlegde-base-mock.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [
    ArticleComponentMock,
    KnowlegdeBaseMockComponent,
    CommonModule,
  ],
  templateUrl: './knowledge-base.component.html',
  styleUrl: './knowledge-base.component.scss'
})
export class KnowledgeBaseComponent {

  view: boolean = false;

  switch() {
    this.view = !this.view;
  }

}
