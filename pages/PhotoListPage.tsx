
import React from 'react';
import type { Photo } from '../types';
import Button from '../components/ui/Button';
import CrudComponent from '../components/CrudComponent';

const initialPhotos: Photo[] = [
  { id: '1', name: 'Sunset Over Mountains', imageUrl: 'https://picsum.photos/id/10/400/300', category: 'Landscape', createdAt: new Date().toISOString() },
  { id: '2', name: 'City at Night', imageUrl: 'https://picsum.photos/id/20/400/300', category: 'Cityscape', createdAt: new Date().toISOString() },
];

const PhotoForm: React.FC<{
  onSubmit: (data: Omit<Photo, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Photo | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    imageUrl: initialData?.imageUrl || 'https://picsum.photos/400/300',
    category: initialData?.category || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <label className="block mb-1 font-medium">Photo Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
       <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
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

const PhotoListTable: React.FC<{
  items: Photo[];
  onEdit: (item: Photo) => void;
  onDelete: (id: string) => void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b dark:border-gray-700">
          <th className="p-3">Preview</th>
          <th className="p-3">Name</th>
          <th className="p-3">Category</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-b dark:border-gray-700">
            <td className="p-3"><img src={item.imageUrl} alt={item.name} className="h-16 w-24 object-cover rounded"/></td>
            <td className="p-3">{item.name}</td>
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


const PhotoListPage: React.FC = () => {
    return (
        <CrudComponent<Photo>
            title="Manage Photo List"
            itemType="Photo"
            initialItems={initialPhotos}
            renderTable={(items, onEdit, onDelete) => <PhotoListTable items={items} onEdit={onEdit} onDelete={onDelete} />}
            renderForm={(onSubmit, onCancel, isLoading, initialData) => <PhotoForm onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} initialData={initialData} />}
        />
    );
};

export default PhotoListPage;
