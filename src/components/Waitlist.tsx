import { motion } from "framer-motion";
import { useState } from "react";
import waitlistImg from "../assets/waitlist.jpg"
import axios from "axios";

const Waitlist = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "https://ogivva-codebackend-production.up.railway.app/v1/waitlist",
        {
          email: formData.email,
          name: formData.name,
          source: "landing_page",
        }
      );

      setMessage("🎉 Check yor email!");
      setFormData({ name: "", email: "" }); // reset inputs
    } catch (error) {
      console.error("Error submitting waitlist:", error);
      setMessage("Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-black text-center py-16 px-4 sm:px-6 md:px-10"
      id="waitlist"
    >
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-snug">
        Join the Waitlist — Be the First to Spread Kindness
      </h2>
      <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
        Sign up now to get early access when Ogivva launches in your city.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto flex flex-col gap-3"
      >
        {/* Name input */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-md text-white bg-transparent border border-gray-500 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#31BB5E]"
        />

        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-md text-white bg-transparent border border-gray-500 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#31BB5E]"
        />

        {/* Submit button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full px-3 py-2 rounded-md bg-white text-black font-semibold text-sm transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Join the waitlist"}
        </motion.button>
      </form>

      {/* Success / Error Message */}
      {message && <p className="mt-4 text-sm text-gray-200">{message}</p>}
    </section>
  );
};

export default Waitlist;
