
import React from 'react';
import type { Booking } from '../types';
import Button from '../components/ui/Button';
import CrudComponent from '../components/CrudComponent';

const initialBookings: Booking[] = [
  { id: '1', name: 'John Doe Wedding', clientEmail: 'john@example.com', eventDate: '2024-08-15', status: 'Confirmed', createdAt: new Date().toISOString() },
  { id: '2', name: 'Corporate Event', clientEmail: 'corp@example.com', eventDate: '2024-09-01', status: 'Pending', createdAt: new Date().toISOString() },
];

const BookingForm: React.FC<{
  onSubmit: (data: Omit<Booking, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Booking | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    clientEmail: initialData?.clientEmail || '',
    eventDate: initialData?.eventDate || '',
    status: initialData?.status || 'Pending',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Booking, 'id' | 'createdAt'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Booking Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Client Email</label>
        <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Event Date</label>
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

const BookingTable: React.FC<{
  items: Booking[];
  onEdit: (item: Booking) => void;
  onDelete: (id: string) => void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b dark:border-gray-700">
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Event Date</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-b dark:border-gray-700">
            <td className="p-3">{item.name}</td>
            <td className="p-3">{item.clientEmail}</td>
            <td className="p-3">{item.eventDate}</td>
            <td className="p-3">{item.status}</td>
            <td className="p-3">
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => onEdit(item)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(item.id)}>Delete</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const BookingPage: React.FC = () => {
    return (
        <CrudComponent<Booking>
            title="Manage Bookings"
            itemType="Booking"
            initialItems={initialBookings}
            renderTable={(items, onEdit, onDelete) => <BookingTable items={items} onEdit={onEdit} onDelete={onDelete} />}
            renderForm={(onSubmit, onCancel, isLoading, initialData) => <BookingForm onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} initialData={initialData} />}
        />
    );
};

export default BookingPage;
