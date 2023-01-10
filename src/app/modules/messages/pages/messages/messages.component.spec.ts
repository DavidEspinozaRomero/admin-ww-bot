import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { CustomToastService, StorageService } from '../../../../services';
import { ResGetAllMessages } from '../../interfaces/message.inteface';
import { MessagesService } from '../../services/messages.service';
import { MessagesComponent } from './messages.component';

//#region Mocks

const response = {
  qrimg: '<svg><svg/>',
  allmessages: {
    message: 'all ok',
    error: 'all bad',
    data: [
      {
        id: 1,
        query: 'hola',
        answer: 'hola david',
        category: '1',
        startTime: '8:00',
        endTime: '10:00',
      },
      {
        id: 2,
        query: 'hola2',
        answer: 'hola david2',
        category: '2',
        startTime: '9:00',
        endTime: '11:00',
      },
    ],
  },
  createmsg: {
    id: 1,
    query: 'hola',
    answer: 'hola david',
    category: 1,
    startTime: '8:00',
    endTime: '10:00',
  },
  updatemsg: {
    id: 1,
    query: 'saludo',
    answer: 'hola david e',
    category: 1,
    startTime: '8:00',
    endTime: '10:00',
  },
  deletemsg: {
    message: 'mensanje eliminado',
  },
  categories: {
    data: [
      { id: '1', category: 'default' },
      { id: '2', category: 'family' },
    ],
  },
};

const messagesServiceMock = createMock(MessagesService);
messagesServiceMock.getAllMessages = jest.fn(() => of(response.allmessages));
messagesServiceMock.getCategories = jest.fn(() => of(response.categories));
// messagesServiceMock.updateMessage = jest.fn(()=> of())
// messagesServiceMock.createMessage = jest.fn(()=> of())
// messagesServiceMock.deleteMessage = jest.fn(()=> of())
//#endregion Mocks

describe('MessagesComponent', () => {
  // let component: MessagesComponent;
  // let fixture: ComponentFixture<MessagesComponent>;

  // fb: FormBuilder,
  // toast: CustomToastService,
  // storage: StorageService,
  // messagesService: MessagesService
  beforeEach(async () => {
    await render(MessagesComponent, {
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [
        FormBuilder,
        CustomToastService,
        StorageService,
        MessagesService,
      ],
      componentProviders: [
        { provide: MessagesService, useValue: messagesServiceMock },
      ],
    });
  });

  describe('Layout', () => {
    it('has a init correctly', async () => {
      const btn = await screen.findByRole('button', {
        name: '+ Nuevo Mensaje',
      });

      expect(btn).toBeInTheDocument();

      expect(messagesServiceMock.getAllMessages).toBeCalled();
      expect(messagesServiceMock.getCategories).toBeCalled();
    });
    // it('has a init correctly', async () => {
    //   const http = TestBed.inject(HttpTestingController);

    //   const call = http.expectOne('/api/1.0/users');
    //   const reqBody = call.request.body;
    //   console.log(call);
    //   const result = {
    //     username: 'user1',
    //     email: 'user1@gmail.com',
    //     password: 'secretpassword',
    //   };
    //   const btn = screen.getByRole('button', { name: '+ Nuevo Mensaje' });
    //   const btn = await screen.findByRole('button', {
    //     name: '+ Nuevo Mensaje',
    //   });

    //   expect(btn).toBeInTheDocument();
    // });
  });
});
