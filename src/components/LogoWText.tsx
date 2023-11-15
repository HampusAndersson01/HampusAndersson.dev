import { ReactComponent as Logo } from "../assets/logo.svg";
import "./styles/LogoWText.css";

export default function LogoWText() {
  return (
    <>
      <div className="logoContainer">
        <Logo className="logo" />
        <h1>Hampus Andersson</h1>
      </div>
    </>
  );
}
