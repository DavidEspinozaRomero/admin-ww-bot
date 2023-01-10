import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { CustomToastService } from '../../../../services/toast.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-modalqrcode',
  templateUrl: './modalqrcode.component.html',
  styleUrls: ['./modalqrcode.component.scss'],
})
export class ModalqrcodeComponent implements OnInit {
  status = {
    spinner: false,
    loadingQR: false,
    responseQR: true,
  };

  @Input() socket!: Socket;
  @ViewChild('qrcode') qrcodeDiv!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly messagesService: MessagesService,
    private toast: CustomToastService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.#connect();
      this.#messagefromserver();
    }, 1000);
  }

  //#region WebSockets
  #messagefromserver() {
    this.socket.on(
      'message-from-server',
      (payload: { action: string; description: string }) => {
        const { action } = payload;
        console.log(payload);
        
        if (action == 'creating') {
          this.status.spinner = true;
        }
        if (action == 'download') {
          this.status.spinner = false;
          this.getQRCODE();
        }
      }
    );
  }

  #connect() {
    const payload: { action: string; description: string } = {
      action: 'connect',
      description: 'Connect to whatsapp web',
    };
    this.socket.emit('message-from-client', payload);
  }
  //#endregion WebSockets

  //#region methods

  getQRCODE() {
    this.status.loadingQR = true;
    this.messagesService
      .getqrimg()
      .subscribe({
        next: (res: any) => {
          setTimeout(() => {
            this.qrcodeDiv.nativeElement.innerHTML = res;
          }, 300);
          this.status.responseQR = true;
        },
        error: (err) => {
          this.toast.error(err.message);
          this.status.responseQR = false;
        },
      })
      .add(() => {
        this.status.loadingQR = false;
        this.status.spinner = false;
      });
  }
  //#endregion methods
}

//#region interfaces
type SvgInHtml = HTMLElement & SVGElement;

//#endregion interfaces
