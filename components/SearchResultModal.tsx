import { Pokemon } from "pokenode-ts";

import useLockBodyScroll from "@/hooks/useBodyScrollLock";

import PokemonCard from "@/components/PokemonCard";

interface SearchResultModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
  error?: string;
}

const SearchResultModal = ({
  onClose,
  pokemon,
  error,
}: SearchResultModalProps) => {
  useLockBodyScroll();
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-poke-light-blue/50 z-50 flex justify-center items-center animate-fade-in-down">
      <div className="w-[90%] h-[90%] md:h-auto max-w-2xl bg-white rounded-xl px-10 md:py-20 relative flex justify-center items-center animate-fade-in-down">
        {/* close button */}
        <div
          className="w-10 h-10 rounded-full bg-poke-light-blue text-white absolute right-5 top-5 flex justify-center items-center cursor-pointer"
          onClick={onClose}
        >
          <span className="text-lg md:text-2xl">&#10008;</span>
        </div>

        {pokemon && (
          <>
            <div className="w-full space-y-5">
              <p className="capitalize text-center font-bold">
                hey! you searched for me. Click me to see more details.
              </p>
              <PokemonCard pokemon={pokemon} variant="large" />
            </div>
          </>
        )}

        {error && <p className="text-center md:text-2xl font-bold">{error}</p>}
      </div>
    </div>
  );
};

export default SearchResultModal;
