import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Manager, Socket } from 'socket.io-client';
import { ToastBaseService } from 'src/app/services';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';


import { LocalStorageKey, StorageService } from '../../../../services/storage.service';
import { Category, Message } from '../../interfaces/message.inteface';
import { forkJoin } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //#region
  //#endregion
  //#region variables
  @ViewChild('qrcode') qrcodeDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('BtnNewMessage') BtnNewMessage?: ElementRef<HTMLButtonElement>;
  @ViewChild('formColapse') formColapse?: ElementRef<HTMLFormElement>;

  status = {
    loading: false,
    response: false,
    spinner: false,
    loadingQR: false,
    responseQR: false,
    conected: false,
    showFormMessage: false,
  };

  menu = [
    { label: 'respuestas', selected: true },
    { label: 'mensajes', selected: false },
  ];

  categories: Category[] = [];
  listMessages: any[] = [];

  msgIndex!: number;

  showCode: boolean = false;
  private URLWS: string = `${environment.UrlApi}${environment.WebSocketUrl}`;
  manager: any;
  socket!: Socket;

  newMessageGroup: FormGroup = this.fb.group({
    id: [null],
    query: [null, [Validators.required, Validators.minLength(2)]],
    answer: [null, [Validators.required, Validators.minLength(2)]],
    category: ['', Validators.required],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
  });

  miForm: FormGroup = this.fb.group({
    messages: this.fb.array([]),
  });

  //#endregion variables

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: ToastBaseService,
    private readonly storage: StorageService,
    private readonly messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.wsConect();
    this.initApis();
  }

  //#region Apis
  // Get
  // TODO: agregar evento para llamar a la api y traer el qrcode
  getAllMessages() {
    this.status.loading = true;
    this.messagesService
      .getAllMessages()
      .subscribe({
        next: (res: any) => {
          this.listMessages = res.data as Message[];
          this.status.response = true;
        },
        error: (err) => {
          this.toast.error(err.message);
          this.status.response = false;
        },
      })
      .add(() => (this.status.loading = false));
  }
  initApis() {
    forkJoin({
      allmessages: this.messagesService.getAllMessages(),
      categories: this.messagesService.getCategories(),
    })
      .subscribe({
        next: ({ allmessages, categories }: any) => {
          this.listMessages = allmessages.data as Message[];
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
        const editedMessage = res.data
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
    const newMessage = {...msg, category: this.replaceCategoryDescriptionToId(msg.category)}
    this.newMessageGroup.reset(newMessage);
    const open = document
      .getElementById('collapseExample')
      ?.classList.contains('show');
    if (!open) {
      this.BtnNewMessage?.nativeElement.click();
    }
  }
  erase(msg: any, index: number) {
    this.deleteMessage(msg.id, () => {
      this.listMessages.splice(index, 1);
    });
  }
  resetForm() {
    this.newMessageGroup.reset();
  }

  save() {
    this.newMessageGroup.markAllAsTouched();
    if (this.newMessageGroup.invalid) {
      this.toast.error('Falta llenar el formulario');
      return;
    }
    this.buildJson();
  }

  buildJson() {
    const {
      id = null,
      category = 1,
      ...data
    } = { ...this.newMessageGroup.value };
    if (id) {
      this.updateMessage(id, { category: +category, ...data }, this.msgIndex);
      return;
    }
    this.createMessage({ category: +category, ...data });
  }

  isValid(form: FormGroup, control: string) {
    return form.get(control)?.errors && form.get(control)?.touched;
  }

  replaceCategoryIdToDescription(id: number): string {
    return this.categories.find(
      (category) => category.id == id
    )?.description || '';
  }

  replaceCategoryDescriptionToId(categoryDescription: string): number {
    return this.categories.find(
      (category) => category.description == categoryDescription
    )?.id || 0;
  }

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
      this.status.conected = true;
    });
    this.socket.on('disconnect', () => {
      console.log('disconect');
      this.status.conected = false;
    });

    this.socket.on(
      'message-from-server',
      (payload: { action: string; description: string }) => {
        const { action, description } = payload;
        if (action == 'download') {
          this.getQRCODE();
        }
        console.log(payload);
      }
    );
  }

  getQRCODE() {
    this.status.loadingQR = true;
    this.messagesService
      .getqrimg()
      .subscribe({
        next: (res: any) => {
          this.status.responseQR = true;
          setTimeout(() => {
            this.qrcodeDiv.nativeElement.innerHTML = res;
          }, 300);
        },
        error: (err) => {
          this.status.responseQR = false;
        },
      })
      .add(() => (this.status.loadingQR = false));
  }
  //#endregion methods
}

//#region interfaces
type SvgInHtml = HTMLElement & SVGElement;

//#endregion interfaces

