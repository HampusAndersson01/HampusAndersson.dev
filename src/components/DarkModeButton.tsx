import react, { useContext, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DarkModeContext } from "../context/DarkMode";
import "./styles/DarkModeButton.css";
import { motion } from "framer-motion";

function DarkModeButton(props: any) {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    toggleDarkMode();
  };

  return (
    <button
      className={props.className}
      onClick={handleClick}
      title="Toggle dark mode"
    >
      {isDarkMode ? (
        <DarkModeIcon className="icon" />
      ) : (
        <LightModeIcon className="icon" />
      )}
    </button>
  );
}

export default DarkModeButton;
