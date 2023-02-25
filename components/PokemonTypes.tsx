import { PokemonType } from "pokenode-ts";

import { typeColors } from "@/utils/colors";

interface PokemonTypesProps {
  types: PokemonType[];
}

const PokemonTypes = ({ types }: PokemonTypesProps) => {
  return (
    <ul className="flex gap-x-3">
      {types.map((type, i) => (
        <li
          key={type.type.name}
          style={{
            backgroundColor: `${typeColors[types[i].type.name]}`,
          }}
          className="px-4 py-1 rounded-sm text-sm font-semibold text-white capitalize inline-block"
        >
          {type.type.name}
        </li>
      ))}
    </ul>
  );
};

export default PokemonTypes;
