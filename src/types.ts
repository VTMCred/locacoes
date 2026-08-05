export type PageView = 'home' | 'ps5';
export type ModalType = 'none' | 'bikes' | 'terms' | 'whatsapp' | 'games_catalog' | 'date_picker';

export interface RentalOption {
  id: string;
  name: string;
  pricePerDay: number;
  description: string;
}

export interface Accessory {
  id: string;
  name: string;
  price: number;
}
