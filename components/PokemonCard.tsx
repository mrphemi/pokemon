import Link from "next/link";
import Image from "next/image";

import { Pokemon } from "pokenode-ts";

import { typeColors } from "@/utils/colors";
import { zeroPad } from "@/utils/index";

interface PokemonCardProps {
  pokemon: Pokemon;
  variant?: "normal" | "large";
}

const PokemonCard = ({ pokemon, variant = "normal" }: PokemonCardProps) => {
  return (
    <div>
      <Link href={`/pokemon/${pokemon.id}`}>
        <div
          className={`w-full mx-auto space-y-4 cursor-pointer ${
            variant === "normal" ? "max-w-sm" : "max-w-md"
          }`}
        >
          <PokemonAvatar
            name={pokemon.name}
            types={pokemon.types}
            sprites={pokemon.sprites}
          />

          <div className="flex justify-between px-2">
            <div className="space-y-2">
              <p>{`n ${zeroPad(pokemon.id, 3)}`}</p>
              <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
            </div>
            <div className="">
              <span
                style={{
                  backgroundColor: `${typeColors[pokemon.types[0].type.name]}`,
                }}
                className="px-3 py-1 rounded-md text-xs text-white capitalize"
              >
                {pokemon.types[0].type.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;

const PokemonAvatar = ({
  sprites,
  name,
  types,
}: Pick<Pokemon, "sprites" | "name" | "types">) => {
  return (
    <div className="rounded-2xl p-8 relative">
      <div
        style={{
          backgroundColor: `${typeColors[types[0].type.name]}`,
          opacity: 0.25,
        }}
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
      ></div>
      <div className="aspect-square relative max-w-[200px] mx-auto z-10">
        <Image
          className="object-contain"
          src={
            (sprites.other?.dream_world?.front_default as string) ??
            (sprites.front_default as string) ??
            ""
          }
          alt={name}
          fill
        />
      </div>
    </div>
  );
};
