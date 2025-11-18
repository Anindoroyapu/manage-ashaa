
import React from 'react';
import type { Expenditure } from '../types';
import Button from '../components/ui/Button';
import CrudComponent from '../components/CrudComponent';

const initialExpenditures: Expenditure[] = [
  { id: '1', name: 'New Camera Lens', amount: 800, category: 'Equipment', createdAt: new Date().toISOString() },
  { id: '2', name: 'Studio Rent', amount: 1200, category: 'Overhead', createdAt: new Date().toISOString() },
];

const ExpenditureForm: React.FC<{
  onSubmit: (data: Omit<Expenditure, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Expenditure | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    amount: initialData?.amount || 0,
    category: initialData?.category || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Expenditure, 'id' | 'createdAt'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Expense Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

const ExpenditureTable: React.FC<{
  items: Expenditure[];
  onEdit: (item: Expenditure) => void;
  onDelete: (id: string) => void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b dark:border-gray-700">
          <th className="p-3">Name</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Category</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-b dark:border-gray-700">
            <td className="p-3">{item.name}</td>
            <td className="p-3">${item.amount.toFixed(2)}</td>
            <td className="p-3">{item.category}</td>
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

const ExpenditurePage: React.FC = () => {
    return (
        <CrudComponent<Expenditure>
            title="Manage Expenditures"
            itemType="Expenditure"
            initialItems={initialExpenditures}
            renderTable={(items, onEdit, onDelete) => <ExpenditureTable items={items} onEdit={onEdit} onDelete={onDelete} />}
            renderForm={(onSubmit, onCancel, isLoading, initialData) => <ExpenditureForm onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} initialData={initialData} />}
        />
    );
};

export default ExpenditurePage;
