import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseySectionComponent } from './jersey-section.component';

describe('JerseySectionComponent', () => {
  let component: JerseySectionComponent;
  let fixture: ComponentFixture<JerseySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerseySectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerseySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
