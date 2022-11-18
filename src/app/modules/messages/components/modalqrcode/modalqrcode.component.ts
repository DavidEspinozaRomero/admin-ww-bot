import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-modalqrcode',
  templateUrl: './modalqrcode.component.html',
  styleUrls: ['./modalqrcode.component.scss'],
})
export class ModalqrcodeComponent implements OnInit {
  status = {
    loading: false,
    response: false,
    spinner: false,
    loadingQR: false,
    responseQR: false,
    conected: false,
    showFormMessage: false,
  };

  @ViewChild('qrcode') qrcodeDiv!: ElementRef<HTMLDivElement>;

  constructor(private readonly messagesService: MessagesService) {}

  ngOnInit(): void {}

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
}
