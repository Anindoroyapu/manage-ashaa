
import React, { useState, useEffect, useCallback } from 'react';
import type { AnyItem } from '../types';
import Button from './ui/Button';
import Modal from './ui/Modal';

interface CrudComponentProps<T extends AnyItem> {
  title: string;
  itemType: string;
  initialItems: T[];
  renderTable: (items: T[], onEdit: (item: T) => void, onDelete: (id: string) => void) => React.ReactNode;
  renderForm: (
    onSubmit: (item: Omit<T, 'id' | 'createdAt'>) => void, 
    onCancel: () => void,
    isLoading: boolean,
    initialData?: T | null
  ) => React.ReactNode;
}

const CrudComponent = <T extends AnyItem,>({ title, itemType, initialItems, renderTable, renderForm }: CrudComponentProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  // Simulate initial data fetching
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setItems(initialItems);
      setIsLoading(false);
    }, 500);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: T) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setIsLoading(true);
      setTimeout(() => { // Simulate API call
        setItems(prev => prev.filter(item => item.id !== id));
        setIsLoading(false);
      }, 500);
    }
  }, []);

  const handleSubmit = useCallback((formData: Omit<T, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    setTimeout(() => { // Simulate API call
      if (editingItem) {
        // Update
        setItems(prev => prev.map(item => item.id === editingItem.id ? { ...editingItem, ...formData } : item));
      } else {
        // Add
        const newItem: T = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          ...formData
        } as T;
        setItems(prev => [newItem, ...prev]);
      }
      setIsLoading(false);
      handleCloseModal();
    }, 1000);
  }, [editingItem]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={handleOpenAddModal}>Add New {itemType}</Button>
      </div>
      
      {isLoading && items.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {renderTable(items, handleOpenEditModal, handleDelete)}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? `Edit ${itemType}` : `Add New ${itemType}`}
      >
        {renderForm(handleSubmit, handleCloseModal, isLoading, editingItem)}
      </Modal>
    </div>
  );
};

export default CrudComponent;
