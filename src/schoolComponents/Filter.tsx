import "../static/nav.css";

interface FilterProps {
  label: string;
  addFilter: (filter: string) => void;
}

const Filter = ({ filterItems }: { filterItems: FilterProps[] }) => {
  return (
    <ul className="filter">
      {filterItems.map((item, index) => (
        <li key={index} onClick={() => item.addFilter(item.label)}>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
