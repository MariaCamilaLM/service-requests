import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { engineerRoleGuard } from './engineer-role.guard';

describe('engineerRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => engineerRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
