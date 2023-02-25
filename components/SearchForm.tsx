import { Dispatch, FormEvent, SetStateAction } from "react";

interface SearchFormProps {
  submit: () => void;
  onInputChange: Dispatch<SetStateAction<string>>;
  searchString: string;
}

const SearchForm = ({
  submit,
  onInputChange,
  searchString,
}: SearchFormProps) => {
  return (
    <form
      className="mb-20 flex gap-x-3 max-w-2xl mx-auto"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor="search-pokemon" className="sr-only">
        Search Pokemon
      </label>
      <input
        type="text"
        placeholder="Enter Pokemon Name"
        id="search-pokemon"
        className="w-full bg-poke-light-blue/25 p-4 rounded-xl focus:ring-2 focus:ring-poke-light-blue outline-none"
        value={searchString}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <button
        type="submit"
        className="py-4 px-6 h-full bg-poke-light-blue rounded-xl text-white"
      >
        <span className="text-xl">&#8599;</span>
      </button>
    </form>
  );
};

export default SearchForm;
