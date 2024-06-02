import { useEffect, useState } from "react";
import "../static/nav.css";

type ListItem = {
  label: string;
  onClick: () => void;
};

interface NavItem {
  items: ListItem[];
  active?: number;
}

const NavList: React.FC<NavItem> = ({ items, active }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number, onClick: () => void) => {
    setActiveIndex(index);
    onClick();
  };
  useEffect(() => {
    if (active) {
      setActiveIndex(active);
    }
  }, [active]);

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
