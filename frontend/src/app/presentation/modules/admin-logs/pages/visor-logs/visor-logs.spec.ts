import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorLogs } from './visor-logs';

describe('VisorLogs', () => {
  let component: VisorLogs;
  let fixture: ComponentFixture<VisorLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
