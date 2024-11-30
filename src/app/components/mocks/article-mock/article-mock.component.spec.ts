import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponentMock } from './article-mock.component';

describe('ArticleComponentMock', () => {
  let component: ArticleComponentMock;
  let fixture: ComponentFixture<ArticleComponentMock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleComponentMock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
