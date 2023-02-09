import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { loadScript } from '@paypal/paypal-js';

import { CustomToastService } from '../../../../services';
import { environment } from '../../../../../environments/environment';
import { PaymentsService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  //#region Variables
  @ViewChild('paypalcontainer', { static: true }) paypalcontainer!: ElementRef;
  paypal!: any;
  //#endregion Variables

  constructor(
    private readonly toast: CustomToastService,
    private readonly paymentsService: PaymentsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.paypalButton();
  }

  //#region apis

  //#endregion apis

  //#region methods
  async paypalButton() {
    try {
      this.paypal = await loadScript({
        'client-id': environment.paypalid,
      });
    } catch (error) {
      console.error('failed to load the PayPal JS SDK script', error);
    }

    if (this.paypal) {
      try {
        await this.paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: 'descripcion del producto',
                    amount: {
                      currency_code: 'USD',
                      value: 5,
                    },
                  },
                ],
              });
            },
            onApprove: async (data: any, actions: any) => {
              const order = await actions.order.capture();
              this.toast.success(
                'Se a realizado la compra con exito',
                'Compra realizada'
              );
              this.paymentsService
                .confirmPayment(order)
                .subscribe({
                  next: () => {
                    this.router.navigate(['/settings']);
                  },
                })
                .add();
            },
            onError: (err: any) => {
              this.toast.error('No se a realizado la compra', 'Fallo');
            },
          })
          .render(this.paypalcontainer.nativeElement);
      } catch (error) {
        console.error('failed to render the PayPal Buttons', error);
      }
    }
  }
  //#endregion methods
}
