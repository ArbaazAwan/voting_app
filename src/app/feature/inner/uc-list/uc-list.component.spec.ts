import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcListComponent } from './uc-list.component';

describe('UcListComponent', () => {
  let component: UcListComponent;
  let fixture: ComponentFixture<UcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UcListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
