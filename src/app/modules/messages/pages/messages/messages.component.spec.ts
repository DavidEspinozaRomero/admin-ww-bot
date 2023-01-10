import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  // let component: MessagesComponent;
  // let fixture: ComponentFixture<MessagesComponent>;

  // fb: FormBuilder,
  // toast: CustomToastService,
  // storage: StorageService,
  // messagesService: MessagesService
  beforeEach(async () => {
    await render(MessagesComponent, {
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });
  });

  describe('Layout', () => {
    it('has a tilte', () => {
      const btn = screen.getByRole('button', { name: '+ Nuevo Mensaje' });
      expect(btn).toBeInTheDocument();
    });
  });
});
