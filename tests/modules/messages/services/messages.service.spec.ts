import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MessagesService } from '../../../../src/app/modules/messages/services/messages.service';

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
        category: 1,
        startTime: '8:00',
        endTime: '10:00',
      },
      {
        id: 2,
        query: 'hola2',
        answer: 'hola david2',
        category: 2,
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
      { id: 1, category: 'default' },
      { id: 2, category: 'family' },
    ],
  },
};
//#endregion Mocks

describe('MessagesService', () => {
  let service: MessagesService;
  let httpMock: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };

    service = new MessagesService(httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Apis', () => {
    it('should return a svg QR', () => {
      expect(typeof service.getqrimg).toBe('function');
    });
    it('should has getqrimg', (done) => {
      const url = 'http://localhost:3000/bot-webwhatsap/qrcode';
      const headers: HttpHeaders = new HttpHeaders();
      headers.set('Accept', `image/svg+xml`);

      jest.spyOn(httpMock, 'get').mockReturnValue(of(response.qrimg));
      service.getqrimg().subscribe({
        next: (res) => {
          expect(res).toEqual(response.qrimg);
          done();
        },
        error: console.log,
      });

      expect(httpMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledWith(url, {
        headers,
        responseType: 'text',
      });
    });

    it('should has createMessage', () => {
      expect(typeof service.createMessage).toBe('function');
    });
    it('should create a message and return it', (done) => {
      const url = 'http://localhost:3000/messages';
      const payload = {
        query: 'hola',
        answer: 'hola david',
        category: 1,
        startTime: '8:00',
        endTime: '10:00',
      };

      jest.spyOn(httpMock, 'post').mockReturnValue(of(response.createmsg));
      service.createMessage(payload).subscribe({
        next: (res) => {
          expect(res).toEqual(response.createmsg);
          done();
        },
        error: console.log,
      });

      expect(httpMock.post).toBeCalledTimes(1);
      expect(httpMock.post).toBeCalledWith(url, payload);
    });

    it('should has getAllMessages', () => {
      expect(typeof service.getAllMessages).toBe('function');
    });
    it('should return All Messages from user', (done) => {
      const url = 'http://localhost:3000/messages';

      jest.spyOn(httpMock, 'get').mockReturnValue(of(response.allmessages));
      service.getAllMessages().subscribe({
        next: (res) => {
          expect(res).toEqual(response.allmessages);
          done();
        },
        error: console.log,
      });

      expect(httpMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledWith(url);
    });

    it('should has updateMessage', () => {
      expect(typeof service.updateMessage).toBe('function');
    });
    it('should update a message and return it', (done) => {
      const payload = {
        id: '1',
        query: 'saludo',
        answer: 'hola david e',
        category: 1,
        startTime: '8:00',
        endTime: '10:00',
      };
      const url = `http://localhost:3000/messages/${payload.id}`;

      jest.spyOn(httpMock, 'patch').mockReturnValue(of(response.updatemsg));
      service.updateMessage(payload.id, payload).subscribe({
        next: (res) => {
          expect(res).toEqual(response.updatemsg);
          done();
        },
        error: console.log,
      });

      expect(httpMock.patch).toBeCalledTimes(1);
      expect(httpMock.patch).toBeCalledWith(url, payload);
    });

    it('should has deleteMessage', () => {
      expect(typeof service.deleteMessage).toBe('function');
    });
    it('should delete message by id', (done) => {
      const id = '1';
      const url = `http://localhost:3000/messages/${id}`;
      jest.spyOn(httpMock, 'delete').mockReturnValue(of(response.deletemsg));
      service.deleteMessage(id).subscribe({
        next: (res) => {
          expect(res).toEqual(response.deletemsg);
          done();
        },
        error: console.log,
      });
      expect(httpMock.delete).toBeCalledTimes(1);
      expect(httpMock.delete).toBeCalledWith(url);
    });

    it('should has getCategories', () => {
      expect(typeof service.getCategories).toBe('function');
    });
    it('should return the categories', (done) => {
      const url = 'http://localhost:3000/messages/get-categories';

      jest.spyOn(httpMock, 'get').mockReturnValue(of(response.categories));
      service.getCategories().subscribe({
        next: (res) => {
          expect(res).toEqual(response.categories);
          done();
        },
        error: console.log,
      });

      expect(httpMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledWith(url);
    });
  });
});
