
import React from 'react';
import type { Expenditure } from '../types';
import Button from '../components/ui/Button';
import CrudComponent from '../components/CrudComponent';


const ExpenditureForm: React.FC<{
  onSubmit: (data: Omit<Expenditure, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Expenditure | null;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

 const handleSubmit = async (e: any) => {
     e.preventDefault();
    try {
       const endpointBase = "https://admin.ashaa.xyz/api/Expenditure";
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
        expenditure: "expenditure",
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
              <label className="block mb-1 font-medium">Expenditure Reason</label>
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
                    <th className="p-3">Title</th>
          <th className="p-3">Details</th>
          <th className="p-3">Note</th>

          <th className="p-3">Amount</th>
          {/* <th className="p-3">Payment Method</th> */}
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
            {/* <td className="p-3">{item.method}</td> */}
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
        const [expenditureList, setExpenditureList] = React.useState<Expenditure[]>([]);
        const [isLoading, setIsLoading] = React.useState(true);
      
        React.useEffect(() => {
          fetchData();
        }, []);
      
        const fetchData = async () => {
          try {
            const res = await fetch("https://admin.ashaa.xyz/api/Expenditure");
            const json = await res.json();
            setExpenditureList(json || []);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setIsLoading(false);
          }
        };
    return (
        <CrudComponent<Expenditure>
            title="Manage Expenditures"
            itemType="Expenditure"
            initialItems={expenditureList}
            renderTable={(items, onEdit, onDelete) => <ExpenditureTable items={items} onEdit={onEdit} onDelete={onDelete} />}
            renderForm={(onSubmit, onCancel, isLoading, initialData) => <ExpenditureForm onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} initialData={initialData} />}
        />
    );
};

export default ExpenditurePage;
