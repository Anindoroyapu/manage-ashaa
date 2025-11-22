import { Booking } from "@/types";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { 
  Camera, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,

  Star,
  Loader2,
  Instagram,
  Facebook,
  Globe
} from 'lucide-react';

 interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  package: string;
  subject: string;
  bookingType: string;
  message: string;
  bookingCost: number | '';
  totalCost: number | '';
  paymentMethod: string;
  startDate: string;
  endDate: string;
  paymentStatus: string;
  status: string;
}
 const initialFormData: BookingFormData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  package: '',
  subject: '',
  bookingType: '',
  message: '',
  bookingCost: '',
  totalCost: '',
  paymentMethod: '',
  startDate: '',
  endDate: '',
  paymentStatus: 'Pending',
  status: 'Pending',
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 15 }
  }
};

const inputFocusScale = { scale: 1.01, backgroundColor: "rgba(30, 41, 59, 0.8)" };

// Reusable Components for Cleaner Code

interface InputProps extends HTMLMotionProps<"input"> {
  label: string;
  icon?: React.ReactNode;
}

const FloatingInput = ({ label, icon, className, value, ...props }: InputProps) => {
  // Date/Time inputs always have a placeholder mask (e.g., mm/dd/yyyy), so we must always float the label
  const isDateOrTime = props.type === 'date' || props.type === 'time' || props.type === 'datetime-local';
  
  return (
    <div className="relative group">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#D4AF37] transition-colors z-10 pointer-events-none">
          {icon}
        </div>
      )}
      <motion.input
        whileFocus={inputFocusScale}
        {...props}
        value={value}
        className={`w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 text-white outline-none focus:border-[#C5A028]/50 focus:ring-1 focus:ring-[#C5A028]/50 transition-all placeholder-transparent peer [color-scheme:dark]
          ${icon ? 'pl-11 pr-4' : 'px-4'} ${className}`}
        placeholder={label}
        id={props.name}
      />
      <label 
        htmlFor={props.name}
        className={`absolute transition-all duration-200 pointer-events-none text-slate-400
          ${icon ? 'left-11' : 'left-4'}
          ${value || isDateOrTime ? '-top-2.5 text-xs bg-slate-900 px-1 text-[#D4AF37]' : 'top-3 text-sm'}
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-slate-900 peer-focus:px-1 peer-focus:text-[#D4AF37]
        `}
      >
        {label}
      </label>
    </div>
  );
};

const SelectInput = ({ label, options, value, ...props }: any) => (
  <div className="relative group">
    <motion.select
      whileFocus={inputFocusScale}
      {...props}
      value={value}
      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C5A028]/50 focus:ring-1 focus:ring-[#C5A028]/50 transition-all appearance-none peer cursor-pointer"
    >
      <option value="" disabled hidden></option>
      {options.map((opt: string) => (
        <option key={opt} value={opt} className="bg-slate-800 text-white py-2">{opt}</option>
      ))}
    </motion.select>
    <label 
      className={`absolute left-4 transition-all duration-200 pointer-events-none text-slate-400
        ${value ? '-top-2.5 text-xs bg-slate-900 px-1 text-[#D4AF37]' : 'top-3 text-sm'}
        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-slate-900 peer-focus:px-1 peer-focus:text-[#D4AF37]
      `}
    >
      {label}
    </label>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </div>
);


const BookingForm: React.FC<{
  onSubmit: (data: Omit<Booking, "id" | "createdAt">) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Booking | null;
}> = ({ onSubmit,  initialData }) => {

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

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      setIsSubmitted(true);
    setIsSubmitting(false);

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
   
  

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
        {/* Success Screen Background */}
        <div className="absolute inset-0 z-0">
            <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
            >
            <source src="https://videos.pexels.com/video-files/855002/855002-hd_1920_1080_30fps.mp4" type="video/mp4" />
            </video>
        </div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-[#D4AF37]/30 p-10 rounded-3xl text-center shadow-2xl relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="text-green-400 w-10 h-10" />
          </motion.div>
          <h2 className="text-3xl font-serif text-white mb-4">Request Received</h2>
          <p className="text-slate-300 mb-8">
            Thank you, {formData.fullName.split(' ')[0]}! We have received your booking inquiry for the <span className="text-[#D4AF37]">{formData.subject}</span>. Our team will review the dates and get back to you shortly.
          </p>
          <button 
            onClick={() => { setIsSubmitted(false); setFormData(initialFormData); }}
            className="text-[#D4AF37]  px-3 py-1.5 rounded bg-green-500/20 hover:text-[#FDE68A] font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            Send another request <ArrowRight size={16} />
          </button>
         
          <a href="https://ashaa.xyz"             className="text-[#D4AF37] w-fit mt-2.5 px-3 py-1.5 rounded bg-green-500/20 hover:text-[#FDE68A] font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
> Back To Home <ArrowRight size={16} /></a>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen w-full bg-slate-950 relative font-sans selection:bg-[#C5A028]/30">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Video Background: Photographer taking photos */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[20%]"
        >
          <source src="https://videos.pexels.com/video-files/855002/855002-hd_1920_1080_30fps.mp4" type="video/mp4" />
          {/* Fallback for older browsers */}
          <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="Photographer background" />
        </video>

        {/* Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-900/70"></div>
        
        {/* Simulated Camera Flash Animation */}
        <motion.div 
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{ 
            duration: 0.15, 
            repeat: Infinity, 
            repeatDelay: 7, 
            repeatType: "loop",
            times: [0, 0.5, 1],
            delay: 2
          }}
          className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay z-0"
        />

        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B49120]/10 rounded-full blur-3xl mix-blend-screen animate-pulse" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:py-12">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-4xl"
        >
          

          {/* Main Form Card */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5">
              
              {/* Left Column: Image & Info (Hidden on Mobile) */}
              <div className="hidden lg:flex lg:col-span-2 relative bg-slate-800 overflow-hidden flex-col justify-between p-8 text-white">
                {/* Brand Header */}
        
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1887&auto=format&fit=crop')] bg-cover bg-center opacity-50 hover:scale-105 transition-transform duration-[20s]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
                
                <div className="relative z-10">
                    <div  className="text-center mb-10">
            
            <h1 className="text-4xl  font-serif text-white  tracking-tight drop-shadow-lg">
              Asha <span className="text-[#D4AF37] italic">Lenscraft</span>
            </h1>
           
          </div>
                  <h3 className="text-2xl font-serif italic mb-2">"Photography is the story I fail to put into words."</h3>
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />)}
                  </div>
                  <p className="text-slate-300 text-sm">Trusted by over 500+ happy couples and clients.</p>
                </div>

                <div className="relative z-10 space-y-4">
                  
                  <div className="flex items-center gap-3 text-slate-300 text-sm hover:text-white transition-colors cursor-pointer">
                    <Facebook size={18} /> Asha Lenscraft
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-sm hover:text-white transition-colors cursor-pointer">
                    <Globe size={18} /> www.ashaa.xyz
                  </div>
                </div>
              </div>

              {/* Right Column: The Form */}
              <div className="lg:col-span-3 px-6 md:p-10">
                <div className="text-2xl font-serif italic">Booking Form</div>
                <div className="space-y-8">
                  
                  {/* Personal Details Section */}
                  <motion.div variants={itemVariants} className="space-y-5">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="text-[#D4AF37]" size={18} />
                      <h3 className="text-white font-serif text-lg tracking-wide">About You</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <FloatingInput 
                        label="Full Name" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                        icon={<User size={16} />}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingInput 
                          label="Email Address" 
                          type="email"
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          icon={<Mail size={16} />}
                        />
                        <FloatingInput 
                          label="Phone Number" 
                          type="tel"
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          icon={<Phone size={16} />}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Event Details Section */}
                  <motion.div variants={itemVariants} className="space-y-5">
                     <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="text-[#D4AF37]" size={18} />
                      <h3 className="text-white font-serif text-lg tracking-wide">The Event</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectInput 
                        label="Event Type"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        options={['Wedding', 'Engagement', 'Portrait', 'Corporate', 'Birthday', 'Maternity', 'Other']}
                      />
                      <SelectInput 
                        label="Preferred Package"
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        options={['Basic Collection', 'Standard Collection', 'Premium Collection', 'Custom Experience']}
                      />
                    </div>

                    <FloatingInput 
                      label="Venue Location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange} 
                      icon={<MapPin size={16} />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FloatingInput 
                          label="Start Date" 
                          type="date"
                          name="startDate" 
                          value={formData.startDate} 
                          onChange={handleChange} 
                          min={today}
                          icon={<Calendar size={16} />}
                        />
                        <FloatingInput 
                          label="End Date (Optional)" 
                          type="date"
                          name="endDate" 
                          value={formData.endDate} 
                          onChange={handleChange} 
                          min={formData.startDate || today}
                          icon={<Calendar size={16} />}
                        />
                    </div>

                    <div className="relative group">
                      <motion.textarea
                        whileFocus={inputFocusScale}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C5A028]/50 focus:ring-1 focus:ring-[#C5A028]/50 transition-all resize-none placeholder-transparent peer"
                        placeholder="Message"
                        id="message"
                      />
                      <label 
                        htmlFor="message"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none text-slate-400
                          ${formData.message ? '-top-2.5 text-xs bg-slate-900 px-1 text-[#D4AF37]' : 'top-3 text-sm'}
                          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-slate-900 peer-focus:px-1 peer-focus:text-[#D4AF37]
                        `}
                      >
                        Tell us more about your vision...
                      </label>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B49120] text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-[#C5A028]/20 flex items-center justify-center gap-2 hover:shadow-[#C5A028]/40 transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Request Availability <ArrowRight size={20} />
                        </>
                      )}
                    </motion.button>
                    <p className="text-center text-slate-500 text-xs mt-4">
                      We usually respond within 24 hours. No payment required now.
                    </p>
                  </motion.div>

                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default BookingForm;