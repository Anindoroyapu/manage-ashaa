export interface BaseItem {
  id: string;
  name: string;
  createdAt: string;
}

export interface Booking extends BaseItem {
  bookingCost: number;
  bookingType: string;
  email: string;
  endDate: string;
  fullName: string;
  location: string;
  message: string;
  package: string;
  paymentMethod: string;
  paymentStatus: string;
  phone: string;
  startDate: string;
  status: string;
  subject: string;
  totalCost: number;
  updatedAt: string;
}

export interface Contact extends BaseItem {
  email: string;
  phone: string;
  message: string;
}

export interface Photo extends BaseItem {
  imageUrl: string;
  category: string;
}

export interface Collection extends BaseItem {
  amount: number;
  paymentMethod: "Cash" | "Card" | "Online";
}

export interface Expenditure extends BaseItem {
  amount: number;
  category: string;
}

export interface Other extends BaseItem {
  details: string;
  value: string;
}

export type AnyItem =
  | Booking
  | Contact
  | Photo
  | Collection
  | Expenditure
  | Other;
