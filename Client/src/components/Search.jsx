import { useState } from "react";
import { Search } from "lucide-react";

const SnippetFilter = ({ onFilter }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onFilter(value.trim());
  };

  return (
    <div className="relative w-full max-w-xl m-10">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Filter snippets by title, tag, or language..."
        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition-all"
      />
    </div>
  );
};

export default SnippetFilter;
