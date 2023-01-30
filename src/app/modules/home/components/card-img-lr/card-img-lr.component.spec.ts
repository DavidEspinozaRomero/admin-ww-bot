import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImgLrComponent } from './card-img-lr.component';

describe('CardImgLrComponent', () => {
  let component: CardImgLrComponent;
  let fixture: ComponentFixture<CardImgLrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardImgLrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardImgLrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
