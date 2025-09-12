import { motion, AnimatePresence } from "framer-motion";
import { X, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../assets/GivvaLogo.svg";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      await axios.post(
        "https://ogivva-codebackend-production.up.railway.app/v1/waitlist",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          source: "landing_page_modal",
        }
      );
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "" });
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[980px] max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Left side (hidden on mobile) */}
            <div className="hidden md:flex bg-[#F4FFF7] flex-col text-start md:w-[45%] mx-auto pt-[40px] pb-8 overflow-y-auto">
              <div className="px-8 md:px-11">
                <img src={Logo} alt="Ogivva Logo" className="h-8 mb-6" />
                <h3 className="text-[#101010] text-2xl md:text-[28px] font-semibold mb-6 leading-tight">
                  A Gift for every Moment
                </h3>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      title: "Receiver Creates a “Moment”",
                      desc: "Curates wishlists of the things they truly want, share moment with friends, family, or keep it public for anyone to surprise them.",
                    },
                    {
                      title: "Gifter Chooses & Sends",
                      desc: "Discover moments shared publicly or receive them directly from loved ones. Pick gifts from trusted vendors and decide if you want to reveal yourself or stay anonymous.Discover moments shared publicly or receive them directly...",
                    },
                    {
                      title: "Vendor Delivers the Experience",
                      desc: "List your products or services on Ogivva. Every gift purchased supports local and small businesses while delivering joy to the receiver.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CircleCheck className="w-5 h-5 text-[#31BB5E] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[#101010] text-base md:text-lg font-semibold">
                          {item.title}
                        </p>
                        <p className="text-[#818080] text-sm mt-1 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="w-full md:w-[55%] flex flex-col h-full relative pt-[40px] pb-8 overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close waitlist"
                className="absolute top-4 right-4"
              >
                <div className="p-1 rounded-md hover:bg-gray-100 transition border">
                  <X className="w-5 h-5 text-gray-600" />
                </div>
              </button>

              {/* Content wrapper */}
              <div className="flex flex-col justify-start h-full px-6 md:px-10">
                <h2 className="text-2xl md:text-4xl font-bold text-[#101010] mb-3 leading-tight text-left">
                  Join the Waitlist — Be the First to Spread Kindness
                </h2>

                <p className="text-[#818080] text-sm md:text-base font-medium mb-6 text-left">
                  Join our extensive waitlist to get early access when Ogivva
                  launches
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {["firstName", "lastName", "email"].map((field, idx) => (
                    <div key={idx} className="flex flex-col text-left">
                      <label
                        htmlFor={field}
                        className="text-[#101010] text-sm font-semibold mb-1"
                      >
                        {field === "firstName"
                          ? "First Name"
                          : field === "lastName"
                          ? "Last Name"
                          : "Email Address"}
                      </label>
                      <input
                        id={field}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={
                          field === "firstName"
                            ? "Enter your first name"
                            : field === "lastName"
                            ? "Enter your last name"
                            : "Enter your email address"
                        }
                        value={(formData as any)[field]}
                        onChange={handleChange}
                        required
                        className="bg-[#F6F6F6] text-[#818080] font-medium w-full px-4 py-3 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6F7EE]"
                      />
                    </div>
                  ))}

                  {/* Button States */}
                  {success ? (
                    <motion.a
                      href="https://mail.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-2 py-3 rounded-lg bg-[#31BB5E] text-white font-semibold text-sm shadow-sm transition text-center"
                    >
                      Click to check your email
                    </motion.a>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3 rounded-lg bg-[#31BB5E] text-white font-semibold text-sm shadow-sm disabled:opacity-60 transition"
                    >
                      {loading
                        ? "Submitting..."
                        : error
                        ? "Try Again"
                        : "Join the waitlist"}
                    </motion.button>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
