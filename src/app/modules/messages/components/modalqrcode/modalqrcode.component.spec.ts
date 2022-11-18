import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalqrcodeComponent } from './modalqrcode.component';

describe('ModalqrcodeComponent', () => {
  let component: ModalqrcodeComponent;
  let fixture: ComponentFixture<ModalqrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalqrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
