import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MainService } from '../../services/main.service';
import { Manager, Socket } from 'socket.io-client';
import { ToastBaseService } from 'src/app/modules/shared/services';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  status = {
    loading: false,
    response: false,
    spinner: false,
    loadingQR: false,
    responseQR: false,
    conected: false,
    showFormMessage: false,
  };

  categories = [
    'default',
    'familia',
    'amigo',
    'negocio',
    'informativo',
    'pareja',
  ];
  today: string = new Date().toLocaleDateString();
  listMessages: any = [];

  showCode: boolean = false;
  private URLWS: string = 'http://localhost:3000/socket.io/socket.io.js';
  manager: any;
  socket!: Socket;

  newMessageGroup: FormGroup = this.fb.group({
    message: [null, [Validators.required, Validators.minLength(2)]],
    category: ['', Validators.required],
    date: [null, [Validators.required]],
  });

  miForm: FormGroup = this.fb.group({
    messages: this.fb.array([]),
  });
  //#endregion variables

  public get user() {
    return this.authService.user;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: ToastBaseService,
    private readonly authService: AuthService,
    private readonly mainService: MainService
  ) {}

  ngOnInit(): void {
    this.getAllMessages();
  }

  //#region Apis
  // Get
  // TODO: agregar evento para llamar a la api y traer el qrcode
  getAllMessages() {
    this.mainService.getAllMessages().subscribe({
      next: (res: any) => {
        console.log(res);
        this.listMessages = res.data;
      },
      error: (err) => {
        console.log(err);
        this.toast.error(err.message);
      },
    });
  }

  // Post
  createMessage(json: {}) {
    this.mainService.createMessage(json).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.toast.error(err.message);
      },
    });
  }
  // Update
  updateMessage(id: string, json: {}) {
    this.mainService.updateMessage(id, json).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.toast.error(err.message);
      },
    });
  }
  // Delete
  deleteMessage(id: string) {
    this.mainService.deleteMessage(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.toast.error(err.message);
      },
    });
  }
  //#endregion Apis

  //#region methods
  cancel() {
    this.BtnNewMessage?.nativeElement.click();
    this.resetForm();
  }
  edit(msg: any, index: number) {
    console.log(msg, index);
  }
  erase(msg: any, index: number) {
    console.log(msg, index);
  }
  resetForm() {
    this.newMessageGroup.reset();
  }

  save() {
    this.newMessageGroup.markAllAsTouched();
    new Date().toLocaleDateString();
    if (this.newMessageGroup.invalid) {
      this.toast.error('Falta llenar el formulario');
      return;
    }
    this.buildJson();
  }

  buildJson() {
    let json = this.newMessageGroup.value;
    console.log(JSON.stringify(json));

    this.createMessage(json);
  }

  isValid(form: FormGroup, control: string) {
    return form.get(control)?.errors && form.get(control)?.touched;
  }

  // wsConect () {
  // this.getQRCODE();
  // this.manager = new Manager(this.URLWS)
  // this.socket?.removeAllListeners();

  // this.socket = this.manager.socket('/');

  // this.socket.on('connect', () => {
  //   console.log('conect');
  //   this.status.conected = true;
  // });
  // this.socket.on('disconnect', () => {
  //   console.log('disconect');
  //   this.status.conected = false;
  // });

  // this.socket.on(
  //   'message-from-server',
  //   (payload: { fullName: string; message: string, qr?: File }) => {
  //     // this.messages.push(payload);
  //     console.log(payload);
  //     if (payload.qr) {
  //       var reader = new FileReader();
  //       reader.readAsText(payload.qr)
  //       console.log();

  //     }
  //   }
  // );

  // }
  // getQRCODE() {
  //   this.status.loadingQR = true;
  //   this.mainService
  //     .getqrimg()
  //     .subscribe({
  //       next: (res: any) => {
  //         this.status.responseQR = true;
  //         setTimeout(() => {
  //           this.qrcodeDiv.nativeElement.innerHTML = res;
  //         }, 300);
  //       },
  //       error: (err) => {
  //         this.status.responseQR = false;
  //       },
  //     })
  //     .add(() => (this.status.loadingQR = false));
  // }
  //#endregion methods
}

//#region interfaces
type SvgInHtml = HTMLElement & SVGElement;

//#endregion interfaces

// new Date().toDateString()
// 'Sun Oct 02 2022'
// new Date().toGMTString()
// 'Mon, 03 Oct 2022 01:15:14 GMT'
// new Date().toISOString()
// '2022-10-03T01:15:29.241Z'
// new Date().toString()
// 'Sun Oct 02 2022 20:15:52 GMT-0500 (Ecuador Time)'
// new Date().toLocaleDateString()
// '10/2/2022'
// new Date().toLocaleString()
// '10/2/2022, 8:16:25 PM'
// new Date().toLocaleTimeString()
// '8:16:36 PM'
