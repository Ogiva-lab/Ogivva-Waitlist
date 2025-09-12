import { motion } from "framer-motion";
import clsx from "clsx"; // optional helper for conditional classes

interface WaitlistButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary"; // default: secondary
}

const WaitlistButton: React.FC<WaitlistButtonProps> = ({
  onClick,
  variant = "secondary",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={clsx(
        "px-6 py-3 rounded-md font-semibold text-sm sm:text-base transition",
        variant === "primary"
          ? "bg-[#31BB5E] text-white"
          : "bg-white text-[#101010]"
      )}
    >
      Join the waitlist
    </motion.button>
  );
};

export default WaitlistButton;
