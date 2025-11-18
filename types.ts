
export interface BaseItem {
    id: string;
    name: string;
    createdAt: string;
}

export interface Booking extends BaseItem {
    clientEmail: string;
    eventDate: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
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
    paymentMethod: 'Cash' | 'Card' | 'Online';
}

export interface Expenditure extends BaseItem {
    amount: number;
    category: string;
}

export interface Other extends BaseItem {
    details: string;
    value: string;
}

export type AnyItem = Booking | Contact | Photo | Collection | Expenditure | Other;
