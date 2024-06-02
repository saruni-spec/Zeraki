import { useState } from "react";
import "../static/nav.css";

type NavItem = {
  label: string;
  onClick: () => void;
};

const NavList = ({ items }: { items: NavItem[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number, onClick: () => void) => {
    setActiveIndex(index);
    onClick();
  };

  return (
    <ul className="nav">
      {items.map((item, index) => (
        <li
          key={index}
          className={activeIndex === index ? "isActive" : ""}
          onClick={() => handleClick(index, item.onClick)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default NavList;
