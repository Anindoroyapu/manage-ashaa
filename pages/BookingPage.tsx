import React from "react";
import type { Booking } from "../types";
import Button from "../components/ui/Button";
import CrudComponent from "../components/CrudComponent";

// const initialBookings: Booking[] = [
//   {
//     id: "1",
//     name: "John Doe Wedding",
//     clientEmail: "john@example.com",
//     eventDate: "2024-08-15",
//     status: "Confirmed",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "2",
//     name: "Corporate Event",
//     clientEmail: "corp@example.com",
//     eventDate: "2024-09-01",
//     status: "Pending",
//     createdAt: new Date().toISOString(),
//   },
// ];

const BookingForm: React.FC<{
  onSubmit: (data: Omit<Booking, "id" | "createdAt">) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Booking | null;
}> = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const [formData, setFormData] = React.useState({
    id: initialData?.id ?? "",
    bookingCost: initialData?.bookingCost ?? 0,
    bookingType: initialData?.bookingType ?? "",
    email: initialData?.email ?? "",
    endDate: initialData?.endDate ?? "",
    fullName: initialData?.fullName ?? "",
    location: initialData?.location ?? "",
    message: initialData?.message ?? "",
    package: initialData?.package ?? "",
    paymentMethod: initialData?.paymentMethod ?? "",
    paymentStatus: initialData?.paymentStatus ?? "",
    phone: initialData?.phone ?? "",
    startDate: initialData?.startDate ?? "",
    status: initialData?.status ?? "Pending",
    subject: initialData?.subject ?? "",
    totalCost: initialData?.totalCost ?? 0,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const { name } = target;
    let value: any = target.value;

    // convert number inputs to numbers
    if ((target as HTMLInputElement).type === "number") {
      value = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const endpointBase = "https://admin.ashaa.xyz/api/Booking";
      const url = formData.id ? `${endpointBase}/${formData.id}` : endpointBase;
      const method = formData.id ? "PUT" : "POST";

      const payload: Record<string, any> = {
        bookingCost: formData.bookingCost,
        bookingType: formData.bookingType,
        email: formData.email,
        endDate: formData.endDate,
        fullName: formData.fullName,
        location: formData.location,
        message: formData.message,
        package: formData.package,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentStatus,
        phone: formData.phone,
        startDate: formData.startDate,
        status: formData.status,
        subject: formData.subject,
        totalCost: formData.totalCost,
      };

      // include id only when present
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
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Package</label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Subject / Type</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Booking Type</label>
          <select
            name="bookingType"
            value={formData.bookingType}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Single Day">Single Day</option>
            <option value="Multi Day">Multi Day</option>
            <option value="Hourly">Hourly</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Booking Cost</label>
          <input
            type="number"
            name="bookingCost"
            value={formData.bookingCost}
            onChange={handleChange}
            step="0.01"
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Total Cost</label>
          <input
            type="number"
            name="totalCost"
            value={formData.totalCost}
            onChange={handleChange}
            step="0.01"
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Payment Status</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? "Update" : "Create"}
        </Button>
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
          <th className="p-3">Contact</th>
          <th className="p-3">Location</th>
          <th className="p-3">Package</th>
          <th className="p-3">Type</th>

          <th className="p-3">Event Date</th>
          <th className="p-3">Advance</th>
          <th className="p-3">Pay</th>

          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.slice()
                .reverse().map((item) => (
          <tr key={item.id} className="border-b dark:border-gray-700">
            <td className="p-3">{item.fullName}</td>
            <td className="p-3">
              {item.phone}
              <br />
              {item.email}
            </td>
            <td className="p-3">{item.location}</td>
            <td className="p-3">{item.package}</td>
            <td className="p-3">{item.subject}</td>
            <td className="p-3">{item.startDate}</td>
            <td className="p-3">{item.bookingCost}</td>{" "}
            <td className="p-3">{item.totalCost}</td>
            <td className="p-3">{item.paymentStatus}</td>
            <td className="p-3">
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => onEdit(item)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const BookingPage: React.FC = () => {
  const [bookingList, setBookingList] = React.useState<Booking[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://admin.ashaa.xyz/api/Booking");
      const json = await res.json();
      setBookingList(json || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CrudComponent<Booking>
      title="Manage Bookings"
      itemType="Booking"
      initialItems={bookingList}
      renderTable={(items, onEdit, onDelete) => (
        <BookingTable items={items} onEdit={onEdit} onDelete={onDelete} />
      )}
      renderForm={(onSubmit, onCancel, isLoading, initialData) => (
        <BookingForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
          initialData={initialData}
        />
      )}
    />
  );
};
export default BookingPage;
