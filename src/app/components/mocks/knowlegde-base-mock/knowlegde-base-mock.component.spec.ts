import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowlegdeBaseMockComponent } from './knowlegde-base-mock.component';

describe('KnowlegdeBaseMockComponent', () => {
  let component: KnowlegdeBaseMockComponent;
  let fixture: ComponentFixture<KnowlegdeBaseMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowlegdeBaseMockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowlegdeBaseMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
