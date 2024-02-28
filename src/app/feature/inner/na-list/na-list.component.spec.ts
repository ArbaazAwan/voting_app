import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaListComponent } from './na-list.component';

describe('NaListComponent', () => {
  let component: NaListComponent;
  let fixture: ComponentFixture<NaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
