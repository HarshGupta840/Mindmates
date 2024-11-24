import "../../(website)/globals.css";
import State from "../../../context/State";
import Navbar from "../Components/Navbar";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <State>
          {children}
        </State>
      </body>
    </html>
  );
}
