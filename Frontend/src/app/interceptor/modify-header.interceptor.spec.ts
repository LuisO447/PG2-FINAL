import { TestBed } from '@angular/core/testing';

import { ModifyHeaderInterceptor } from './modify-header.interceptor';

describe('ModifyHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ModifyHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ModifyHeaderInterceptor = TestBed.inject(ModifyHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
