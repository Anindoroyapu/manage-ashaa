
import React from 'react';
import type { Other } from '../types';
import Button from '../components/ui/Button';
import CrudComponent from '../components/CrudComponent';

const initialOtherItems: Other[] = [
  { id: '1', name: 'Supplier Note', details: 'Confirmed delivery for next Tuesday.', value: 'N/A', createdAt: new Date().toISOString() },
  { id: '2', name: 'Client Feedback', details: 'Client was very happy with the results.', value: 'Positive', createdAt: new Date().toISOString() },
];

const OtherForm: React.FC<{
  onSubmit: (data: Omit<Other, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Other | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    details: initialData?.details || '',
    value: initialData?.value || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Details</label>
        <textarea name="details" value={formData.details} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" rows={4} required />
      </div>
       <div>
        <label className="block mb-1 font-medium">Value / Category</label>
        <input type="text" name="value" value={formData.value} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

const OtherTable: React.FC<{
  items: Other[];
  onEdit: (item: Other) => void;
  onDelete: (id: string) => void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b dark:border-gray-700">
          <th className="p-3">Name</th>
          <th className="p-3">Details</th>
          <th className="p-3">Value</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-b dark:border-gray-700">
            <td className="p-3">{item.name}</td>
            <td className="p-3 truncate max-w-sm">{item.details}</td>
            <td className="p-3">{item.value}</td>
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

const OtherPage: React.FC = () => {
    return (
        <CrudComponent<Other>
            title="Manage Other Items"
            itemType="Item"
            initialItems={initialOtherItems}
            renderTable={(items, onEdit, onDelete) => <OtherTable items={items} onEdit={onEdit} onDelete={onDelete} />}
            renderForm={(onSubmit, onCancel, isLoading, initialData) => <OtherForm onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} initialData={initialData} />}
        />
    );
};

export default OtherPage;
