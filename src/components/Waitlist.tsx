import { useState } from "react";
import waitlistImg from "../assets/waitlist.jpg";
import WaitlistButton from "./WaitlistButton";
import WaitlistModal from "./WaitlistModal";

const Waitlist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="waitlist" className="relative text-center py-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={waitlistImg}
          alt="Waitlist background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto leading-snug">
          Join the Waitlist — Be the First to Spread Kindness
        </h2>
        <p className="text-white font-medium text-sm sm:text-base mb-10 max-w-xl mx-auto">
          Sign up now to get early access when Ogivva launches in your city.
        </p>
        <WaitlistButton onClick={() => setIsModalOpen(true)} variant="secondary" /> 
      </div>

      {/* Modal */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Waitlist;
