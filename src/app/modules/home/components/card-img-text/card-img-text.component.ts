import { Component } from '@angular/core';

@Component({
  selector: 'app-card-img-text',
  templateUrl: './card-img-text.component.html',
  styleUrls: ['./card-img-text.component.scss'],
})
export class CardImgTextComponent {
  cards: CardHome[] = [
    {
      src: '../../../../../assets/imgs/buyonline.png',
      alt: 'img',
      title: 'Asesoria personalizada',
      description:
        'Permite responder de manera instantánea a posibles clientes.',
    },
    {
      src: '../../../../../assets/imgs/remotelife.png',
      alt: 'img',
      title: 'Personalice respuestas',
      description:
        'Flexibilidad al momento de responder con mensajes personalizados, dinámicos e interactivos.',
    },
    {
      src: '../../../../../assets/imgs/communication.png',
      alt: 'img',
      title: 'Más rapidez',
      description:
        'Se puede usar con cuenta de whatsapp y whatsapp business, para añadir más funcionalidades.',
    },
  ];
}

interface CardHome {
  src: string;
  alt: string;
  title: string;
  description: string;
}
