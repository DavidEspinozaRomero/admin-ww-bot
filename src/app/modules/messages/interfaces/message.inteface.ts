export interface ResMessages {
  message: string;
  error: any;
  data: any;
}
export interface ResGetAllMessages {
  message: string;
  error: any;
  data: Message[];
}

export interface Message {
  id: number;
  query: string;
  answer: string;
  startTime: string;
  endTime: string;
  category: string;
}

export interface Category {
  id: number;
  description: string;
}

// export class Msg {

//TODO: agregar default
//   asdf(obj) {
//     return new Msg(obj)
//   } 

//   constructor(
//     private id: number,
//     private query: string,
//     private answer: string,
//     private startTime: string,
//     private endTime: string,
//     private category: string
//   ) {}
// }
