
import React from 'react';
import type { Contact } from '../types';
import Button from '../components/ui/Button';
import CrudComponent from '../components/CrudComponent';



const ContactForm: React.FC<{
  onSubmit: (data: Omit<Contact, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Contact | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    message: initialData?.message || '',
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
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
       <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" rows={4} required />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

const ContactTable: React.FC<{
  items: Contact[];
  onEdit: (item: Contact) => void;
  onDelete: (id: string) => void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b dark:border-gray-700">
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Phone</th><th className="p-3">Subject</th>
          <th className="p-3">Message</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-b dark:border-gray-700">
            <td className="p-3">{item.fullName}</td>
            <td className="p-3">{item.email}</td>
            <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.subject}</td>
            <td className="p-3 truncate max-w-xs">{item.message}</td>
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


const ContactPage: React.FC = () => {
    const [contactList, setContactList] = React.useState<Contact[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
  
    React.useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const res = await fetch("https://admin.ashaa.xyz/api/Contact");
        const json = await res.json();
        setContactList(json || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    return (
        <CrudComponent<Contact>
            title="Manage Contacts"
            itemType="Contact"
            initialItems={contactList}
            renderTable={(items, onEdit, onDelete) => <ContactTable items={items} onEdit={onEdit} onDelete={onDelete} />}
            renderForm={(onSubmit, onCancel, isLoading, initialData) => <ContactForm onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} initialData={initialData} />}
        />
    );
};

export default ContactPage;
