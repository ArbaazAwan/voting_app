import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaDetailComponent } from './na-detail.component';

describe('NaDetailComponent', () => {
  let component: NaDetailComponent;
  let fixture: ComponentFixture<NaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
