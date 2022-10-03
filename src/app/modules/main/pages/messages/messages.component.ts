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

  status = {
    loading: false,
    response: false,
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
  showCode: boolean = false;

  private URLWS: string = 'http://localhost:3000/socket.io/socket.io.js';
  manager: any;
  socket!: Socket;
  today = new Date();
  newMessageGroup: FormGroup = this.fb.group({
    message: [null, [Validators.required, Validators.minLength(2)]],
    category: [''],
    date: [new Date().toLocaleDateString()],
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

  ngOnInit(): void {}

  //#region Apis
  // Get
  // TODO: agregar evento para llamar a la api y traer el qrcode

  // Post
  createMessage() {
    this.mainService.createMessage({}).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toast.error(err.message);
      },
    });
  }
  // Update

  // Delete

  //#endregion Apis

  //#region methods
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
