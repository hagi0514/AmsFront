import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCpoComponent } from './add-cpo.component';

describe('AddCpoComponent', () => {
  let component: AddCpoComponent;
  let fixture: ComponentFixture<AddCpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
