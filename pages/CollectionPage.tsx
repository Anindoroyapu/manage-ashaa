
import React from 'react';
import type { Collection } from '../types';
import Button from '../components/ui/Button';
import CrudComponent from '../components/CrudComponent';
import { title } from 'process';



const CollectionForm: React.FC<{
  onSubmit: (data: Omit<Collection, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Collection | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    id: initialData?.id || '',
    fullName: initialData?.fullName || '',
    title: initialData?.title || '',
    details: initialData?.details || '',
    note: initialData?.note || '',
    pMethod: initialData?.method || 'Cash',
    amount: initialData?.amount || 0,
    status: initialData?.status || 'Submitted',
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

 const handleSubmit = async (e: any) => {
    e.preventDefault();
   try {
      const endpointBase = "https://admin.ashaa.xyz/api/Collection";
      const url = formData.id ? `${endpointBase}/${formData.id}` : endpointBase;
      const method = formData.id ? "PUT" : "POST";

      const payload: Record<string, any> = {
        fullName: formData.fullName,
        amount: formData.amount,
        method: formData.pMethod,
        details: formData.details,
        note: formData.note,
        title: formData.title,
        status: formData.status,
        collection: "collection",
      };

      if (formData.id) {
        payload.id = formData.id;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("POST Error:", err);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium"> Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
       <div>
        <label className="block mb-1 font-medium">Collection Reason</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
       <div>
        <label className="block mb-1 font-medium">Details</label>
        <input type="text" name="details" value={formData.details} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div> <div>
        <label className="block mb-1 font-medium">Note</label>
        <input type="text" name="note" value={formData.note} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
      </div>
      {/* <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <select name="pMethod" value={formData.pMethod} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>
      </div> */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

const CollectionTable: React.FC<{
  items: Collection[];
  onEdit: (item: Collection) => void;
  onDelete: (id: string) => void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b dark:border-gray-700">
          <th className="p-3">Name</th>
                    <th className="p-3">Title</th>
          <th className="p-3">Details</th>
          <th className="p-3">Note</th>

          <th className="p-3">Amount</th>
          <th className="p-3">Payment Method</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.slice()
                .reverse().map(item => (
          <tr key={item.id} className="border-b dark:border-gray-700">
            <td className="p-3">{item.fullName}</td>
            <td className="p-3">{item.title}</td>
            <td className="p-3">{item.details}</td>
            <td className="p-3">{item.note}</td>
            <td className="p-3">{item.amount.toFixed(2)}</td>
            <td className="p-3">{item.method}</td>
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

const CollectionPage: React.FC = () => {
      const [collectionList, setCollectionList] = React.useState<Collection[]>([]);
      const [isLoading, setIsLoading] = React.useState(true);
    
      React.useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const res = await fetch("https://admin.ashaa.xyz/api/Collection");
          const json = await res.json();
          setCollectionList(json || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
    return (
        <CrudComponent<Collection>
            title="Manage Collections"
            itemType="Collection"
            initialItems={collectionList}
            renderTable={(items, onEdit, onDelete) => <CollectionTable items={items} onEdit={onEdit} onDelete={onDelete} />}
            renderForm={(onSubmit, onCancel, isLoading, initialData) => <CollectionForm onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} initialData={initialData} />}
        />
    );
};

export default CollectionPage;
