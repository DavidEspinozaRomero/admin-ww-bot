import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImgTextComponent } from './card-img-text.component';

describe('CardImgTextComponent', () => {
  let component: CardImgTextComponent;
  let fixture: ComponentFixture<CardImgTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardImgTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardImgTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
