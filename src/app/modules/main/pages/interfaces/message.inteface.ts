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
