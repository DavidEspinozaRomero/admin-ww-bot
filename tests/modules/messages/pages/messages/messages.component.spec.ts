import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult, screen } from '@testing-library/angular';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

import { CustomToastService, StorageService } from '../../../../../src/app/services';
import { MessagesService } from '../../../../../src/app/modules/messages/services/messages.service';
import { MessagesComponent } from '../../../../../src/app/modules/messages/pages/messages/messages.component';
import { UtilsService } from '../../../../../src/app/utils/utils.service';

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

  function initMock() {
    httpMock
      .expectOne('http://localhost:3000/messages')
      .flush(response.allmessages);
    httpMock
      .expectOne('http://localhost:3000/messages/get-categories')
      .flush(response.categories);
    fixture.detectChanges();
  }

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
        UtilsService,
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
  it('should match the snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  describe('Layout', () => {
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
  describe('Apis', () => {
    it('has initApis', () => {
      expect(typeof component.initApis).toBe('function');
    });
    it('onInit run initApis(), call the apis correctly', () => {
      const testReq = httpMock.expectOne('http://localhost:3000/messages');
      const testReq2 = httpMock.expectOne(
        'http://localhost:3000/messages/get-categories'
      );
      expect(testReq.request.method).toBe('GET');
      expect(testReq2.request.method).toBe('GET');
    });

    it('has createMessage', () => {
      expect(typeof component.createMessage).toBe('function');
    });
    it('send json to the service', () => {
      const spy = jest.spyOn(service, 'createMessage');
      const url = 'http://localhost:3000/messages';
      const jsonMock = {
        // id: 1,
        query: 'hola',
        answer: 'hola david',
        category: 1,
        startTime: '8:00',
        endTime: '10:00',
      };
      component.createMessage(jsonMock);

      const testReq = httpMock.match(url);
      expect(testReq[1].request.method).toBe('POST');
      testReq[1].flush(response.createmsg);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(jsonMock);
    });

    it('has updateMessage', () => {
      expect(typeof component.updateMessage).toBe('function');
    });
    it('send json to the service', () => {
      const spy = jest.spyOn(service, 'updateMessage');
      const jsonMock = {
        id: '1',
        query: 'hola',
        answer: 'hola david',
        category: 1,
        startTime: '8:00',
        endTime: '10:00',
      };
      const url = `http://localhost:3000/messages/${jsonMock.id}`;
      component.updateMessage(jsonMock.id, jsonMock, 0);

      const testReq = httpMock.expectOne(url);
      expect(testReq.request.method).toBe('PATCH');
      testReq.flush(response.updatemsg);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(jsonMock.id, jsonMock);
    });

    it('has deleteMessage', () => {
      expect(typeof component.deleteMessage).toBe('function');
    });
    it('send json to the service', () => {
      const spy = jest.spyOn(service, 'deleteMessage');
      const id = '1';
      const url = `http://localhost:3000/messages/${id}`;
      component.deleteMessage(id, () => null);

      const testReq = httpMock.expectOne(url);
      expect(testReq.request.method).toBe('DELETE');
      testReq.flush(response.updatemsg);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
    });
  });

  describe('Methods', () => {
    it('has selecNavItem', () => {
      expect(typeof component.selecNavItem).toBe('function');
    });
    it('has cancel', () => {
      expect(typeof component.cancel).toBe('function');
    });
    it('has edit', () => {
      expect(typeof component.edit).toBe('function');
    });
    it('has erase', () => {
      expect(typeof component.erase).toBe('function');
    });
    it('has resetForm', () => {
      expect(typeof component.resetForm).toBe('function');
    });
    it('has save', () => {
      expect(typeof component.save).toBe('function');
    });
    it('has buildJson', () => {
      expect(typeof component.buildJson).toBe('function');
    });
    it('has replaceCategoryIdToDescription', () => {
      expect(typeof component.replaceCategoryIdToDescription).toBe('function');
    });
    it('has replaceCategoryDescriptionToId', () => {
      expect(typeof component.replaceCategoryDescriptionToId).toBe('function');
    });
  });
});
