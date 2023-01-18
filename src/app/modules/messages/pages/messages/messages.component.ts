import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Manager, Socket } from 'socket.io-client';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { forkJoin } from 'rxjs';

import { CustomToastService } from '../../../../services';
import { MessagesService } from '../../services/messages.service';
import {
  LocalStorageKey,
  StorageService,
} from '../../../../services/storage.service';
import { Category, Message } from '../../interfaces/message.inteface';
import { environment } from '../../../../../environments/environment';
import { UtilsService } from '../../../../utils/utils.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  //#region
  //#endregion
  //#region variables
  @ViewChild('qrcode') qrcodeDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('BtnNewMessage') BtnNewMessage?: ElementRef<HTMLButtonElement>;
  @ViewChild('formColapse') formColapse?: ElementRef<HTMLFormElement>;
  @ViewChild('modalqrcode') modalqrcode?: ElementRef<HTMLButtonElement>;

  status = {
    loading: false,
    response: false,
    spinner: false,
    conected: false,
    showFormMessage: false,
  };

  menu = [
    { label: 'respuestas', selected: true },
    { label: 'mensajes', selected: false },
  ];

  categories: Category[] = [];
  listMessages: Message[] = [];

  msgIndex!: number;

  showCode: boolean = false;
  private URLWS: string = `${environment.UrlApi}${environment.WebSocketUrl}`;
  manager: any;
  socket!: Socket;

  messageForm: FormGroup = this.fb.group({
    id: [null],
    query: [null, [Validators.required, Validators.minLength(2)]],
    answer: [null, [Validators.required, Validators.minLength(2)]],
    category: ['', Validators.required],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
  });

  // miForm: FormGroup = this.fb.group({
  //   messages: this.fb.array([]),
  // });

  //#endregion variables

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: CustomToastService,
    private readonly storage: StorageService,
    private readonly messagesService: MessagesService,
    public readonly utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.wsConect();
    this.initApis();
  }

  //#region WebSocket
  wsConect() {
    this.manager = new Manager(this.URLWS, {
      extraHeaders: {
        authorization:
          this.storage.getLocalStorage(LocalStorageKey.token) || '',
      },
    });
    this.socket?.removeAllListeners();

    this.socket = this.manager.socket('/');

    this.socket.on('connect', () => {
      console.log('conect');
    });
    this.socket.on('disconnect', () => {
      console.log('disconect');
      this.status.conected = false;
    });

    this.socket.on(
      'message-from-server',
      (payload: { action: string; description: string }) => {
        const { action, description } = payload;
        if (action == 'ready') {
          this.status.conected = true;
        }
      }
    );
  }

  //#endregion WebSocket

  //#region Apis
  // Get
  // TODO: agregar evento para llamar a la api y traer el qrcode
  // getAllMessages() {
  //   this.status.loading = true;
  //   this.messagesService
  //     .getAllMessages()
  //     .subscribe({
  //       next: (res) => {
  //         this.listMessages = res.data;
  //         this.status.response = true;
  //       },
  //       error: (err) => {
  //         this.toast.error(err.message);
  //         this.status.response = false;
  //       },
  //     })
  //     .add(() => (this.status.loading = false));
  // }
  initApis() {
    forkJoin({
      allmessages: this.messagesService.getAllMessages(),
      categories: this.messagesService.getCategories(),
    })
      .subscribe({
        next: ({ allmessages, categories }) => {
          this.listMessages = allmessages;
          this.categories = categories;
          this.status.response = true;
        },
        error: (err) => {
          this.toast.error(err.message);
          this.status.response = false;
        },
      })
      .add(() => (this.status.loading = false));
  }

  // Post
  createMessage(json: {}) {
    this.messagesService.createMessage(json).subscribe({
      next: (message: any) => {
        message.category = this.replaceCategoryIdToDescription(
          message.category.id
        );
        this.listMessages.push(message);
        this.BtnNewMessage?.nativeElement.click();
        this.resetForm();
      },
      error: (err) => {
        this.toast.error(err.message);
      },
    });
  }

  // Update
  updateMessage(id: string, json: {}, index: number) {
    this.messagesService.updateMessage(id, json).subscribe({
      next: (res: any) => {
        const editedMessage = res.data;
        editedMessage.category = this.replaceCategoryIdToDescription(
          editedMessage.category.id
        );
        this.listMessages.splice(index, 1, editedMessage);
        this.BtnNewMessage?.nativeElement.click();
        this.resetForm();
      },
      error: (err) => {
        this.toast.error(err.message);
      },
    });
  }

  // Delete
  deleteMessage(id: string, cb: () => void) {
    this.messagesService.deleteMessage(id).subscribe({
      next: (res) => {
        cb();
      },
      error: (err) => {
        this.toast.error(err.message);
      },
    });
  }
  //#endregion Apis

  //#region methods
  selecNavItem(item: any) {
    this.menu.forEach((element) => {
      element.selected = false;
    });
    item.selected = true;
  }
  cancel() {
    this.BtnNewMessage?.nativeElement.click();
    this.resetForm();
  }

  edit(msg: any, index: number) {
    this.msgIndex = index;
    const newMessage = {
      ...msg,
      category: this.replaceCategoryDescriptionToId(msg.category),
    };
    this.messageForm.reset(newMessage);
    const isShowed = document
      .getElementById('collapseExample')
      ?.classList.contains('show');
    if (!isShowed) {
      this.BtnNewMessage?.nativeElement.click();
    }
  }

  erase(msg: any, index: number) {
    this.deleteMessage(msg.id, () => {
      this.listMessages.splice(index, 1);
    });
  }

  resetForm() {
    this.messageForm.reset({ category: '' });
  }

  save() {
    this.messageForm.markAllAsTouched();
    if (this.messageForm.invalid) {
      this.toast.error('Falta llenar el formulario');
      return;
    }
    this.buildJson({ ...this.messageForm.value });
  }

  buildJson(msgFormValue: {
    id: string;
    query: string;
    answer: string;
    category: string;
    startTime: string;
    endTime: string;
  }) {
    const { id = null, category = 1, ...data } = msgFormValue;
    if (!id) {
      this.createMessage({ category: +category, ...data });
      return;
    }
    this.updateMessage(id, { category: +category, ...data }, this.msgIndex);
  }

  replaceCategoryIdToDescription(id: number): string {
    return (
      this.categories.find((category) => category.id == id)?.description || ''
    );
  }

  replaceCategoryDescriptionToId(categoryDescription: string): number {
    return (
      this.categories.find(
        (category) => category.description == categoryDescription
      )?.id || 0
    );
  }

  //#endregion methods
}

//#region interfaces

//#endregion interfaces
