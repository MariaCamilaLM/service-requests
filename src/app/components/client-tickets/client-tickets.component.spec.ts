import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTicketsComponent } from './client-tickets.component';

describe('ClientTicketsComponent', () => {
  let component: ClientTicketsComponent;
  let fixture: ComponentFixture<ClientTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
