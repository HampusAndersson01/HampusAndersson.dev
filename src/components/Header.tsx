import NavBar from "./Navbar";
import DarkModeButton from "./DarkModeButton";
import LogoWText from "./LogoWText";
import "./styles/Header.css";

export default function Header() {
  return (
    <>
      <NavBar></NavBar>
      <DarkModeButton className="darkModeButton"></DarkModeButton>
      <LogoWText></LogoWText>
    </>
  );
}
