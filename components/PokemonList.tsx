import { Pokemon } from "pokenode-ts";

import PokemonCard from "@/components/PokemonCard";

interface PokemonListProps {
  list: Pokemon[];
}

const PokemonList = ({ list }: PokemonListProps) => {
  return (
    <div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-10 p-5 md:p-10 border-2 border-poke-light-blue/50 rounded-2xl">
        {list.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
