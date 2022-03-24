import { SearchIcon, XCircleIcon } from "@heroicons/react/outline";
import { FunctionComponent, useState } from "react";
import IconButton from "../components/IconButton";

interface SearchFieldProps {
  searchQuery?: string;
  onChange?: (query: string) => void;
}

const SearchField: FunctionComponent<SearchFieldProps> = ({
  searchQuery,
  onChange,
}) => {
  const [query, setQuery] = useState(searchQuery ?? "");

  return (
    <div className="flex items-center justify-center gap-2 rounded-md bg-indigo-50 p-2 shadow-md dark:bg-gray-800 dark:text-white">
      <SearchIcon className="h-6 w-6 text-indigo-500" />

      <input
        className="flex-1 bg-transparent outline-none"
        value={query}
        onChange={(e) => {
          let value = e.target.value;
          setQuery(value);
          onChange?.(value);
        }}
        placeholder="Search"
        aria-label="Search Todos"
      />

      {/* Clear input field */}
      <IconButton
        icon={<XCircleIcon className="h-6 w-6" />}
        onClick={() => {
          setQuery("");
          onChange?.("");
        }}
      />
    </div>
  );
};

export default SearchField;
