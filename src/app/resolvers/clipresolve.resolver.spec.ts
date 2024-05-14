import { TestBed } from '@angular/core/testing';

import { ClipresolveResolver } from './clipresolve.resolver';

describe('ClipresolveResolver', () => {
  let resolver: ClipresolveResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClipresolveResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
