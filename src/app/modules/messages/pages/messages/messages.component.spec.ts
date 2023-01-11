import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult, screen } from '@testing-library/angular';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

import { CustomToastService, StorageService } from '../../../../services';
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
  categories: [
    {
      id: 1,
      description: 'default',
    },
    {
      id: 2,
      description: 'family',
    },
    {
      id: 3,
      description: 'job',
    },
  ],
};

// const messagesServiceMock = createMock(MessagesService);
// messagesServiceMock.getAllMessages = jest.fn(() => of());
// messagesServiceMock.getCategories = jest.fn(() => of());
// messagesServiceMock.updateMessage = jest.fn(()=> of())
// messagesServiceMock.createMessage = jest.fn(()=> of())
// messagesServiceMock.deleteMessage = jest.fn(()=> of())
//#endregion Mocks

describe('MessagesComponent', () => {
  let service: MessagesService;
  let httpMock: HttpTestingController;
  let rendered: RenderResult<MessagesComponent>;
  let fixture: ComponentFixture<MessagesComponent>;
  let component: MessagesComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    rendered = await render(MessagesComponent, {
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
    });
  });

  beforeEach(() => {
    service = TestBed.inject(MessagesService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = rendered.fixture;
    component = rendered.fixture.componentInstance;
    compiled = rendered.fixture.nativeElement;
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  it('should exist', () => {
    expect(compiled).toMatchSnapshot();
  });
  describe('Layout', () => {
    const initMock = () => {
      httpMock
        .expectOne('http://localhost:3000/messages')
        .flush(response.allmessages);
      httpMock
        .expectOne('http://localhost:3000/messages/get-categories')
        .flush(response.categories);
      fixture.detectChanges();
    };
    it('has a init correctly', () => {
      const testReq = httpMock.expectOne('http://localhost:3000/messages');
      const testReq2 = httpMock.expectOne(
        'http://localhost:3000/messages/get-categories'
      );
      expect(testReq.request.method).toBe('GET');
      expect(testReq2.request.method).toBe('GET');
    });
    it('has 2 btn whit text "+ Nuevo Mensaje", "Vincular WhatsApp"', async () => {
      initMock();

      const btn1 = await screen.getByRole('button', {
        name: '+ Nuevo Mensaje',
      });
      const btn2 = await screen.getByRole('button', {
        name: 'Vincular WhatsApp',
      });

      expect(btn1).toBeInTheDocument();
      expect(btn2).toBeInTheDocument();
    });
    it('has form whit inputs, textarea, date selector, buttons save/cancel', () => {
      initMock();

      const inputQuery = screen.getByLabelText('Pregunta');
      const inputAnswer = screen.getByLabelText('Respuesta');
      const inputCategory = screen.getByLabelText('Categoria');
      const inputHoraInicio = screen.getByLabelText('Hora inicio');
      const inputHoraFin = screen.getByLabelText('Hora fin');
      const guardar = screen.getByRole('button', { name: 'Guardar' });
      const cancelar = screen.getByRole('button', { name: 'Cancelar' });

      expect(inputQuery).toBeInTheDocument();
      expect(inputAnswer).toBeInTheDocument();
      expect(inputCategory).toBeInTheDocument();
      expect(inputHoraInicio).toBeInTheDocument();
      expect(inputHoraFin).toBeInTheDocument();
      expect(guardar).toBeInTheDocument();
      expect(cancelar).toBeInTheDocument();
    });
    it('has nav tabs', () => {
      initMock();

      const nav = screen.getByRole('list', { name: '' });
      const listitem1 = screen.getByRole('button', { name: 'Respuestas' });
      const listitem2 = screen.getByRole('button', { name: 'Mensajes' });

      expect(nav).toBeInTheDocument();
      expect(listitem1).toBeInTheDocument();
      expect(listitem2).toBeInTheDocument();
    });
    it('has table whit headers: Pregunta, Respuesta, Categoria, Rango de horas, Acciones', () => {
      initMock();

      const table = screen.getByRole('table', { name: 'questions-answers' });
      const colh1 = screen.getByRole('columnheader', { name: 'Pregunta' });
      const colh2 = screen.getByRole('columnheader', { name: 'Respuesta' });
      const colh3 = screen.getByRole('columnheader', { name: 'Categoria' });
      const colh4 = screen.getByRole('columnheader', {
        name: 'Rango de horas',
      });
      const colh5 = screen.getByRole('columnheader', { name: 'Acciones' });

      expect(table).toBeInTheDocument();
      expect(colh1).toBeInTheDocument();
      expect(colh2).toBeInTheDocument();
      expect(colh3).toBeInTheDocument();
      expect(colh4).toBeInTheDocument();
      expect(colh5).toBeInTheDocument();
    });
  });
});
