import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpoListComponent } from './cpo-list.component';

describe('CpoListComponent', () => {
  let component: CpoListComponent;
  let fixture: ComponentFixture<CpoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
