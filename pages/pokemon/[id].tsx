import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Head from "next/head";
import { Pokemon } from "pokenode-ts";

import { Api } from "@/lib/api";
import { typeColors } from "@/utils/colors";
import { zeroPad } from "@/utils/index";

import PokemonStats from "@/components/PokemonStats";
import PokemonTypes from "@/components/PokemonTypes";
import Pagination from "@/components/Pagination";

const Pokemon = ({
  pokemon,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <main className="py-20">
        <div className="wrapper space-y-10">
          <Pagination />
          <div className="px-5 py-8 md:p-10 border-2 border-poke-light-blue/50 rounded-2xl">
            <div className="grid xl:grid-cols-2 gap-y-10 gap-x-20">
              <div className="space-y-10">
                {/* Name, id and types */}
                <div className="space-y-5">
                  <p>{`n ${zeroPad(pokemon.id, 3)}`}</p>
                  <h1 className="text-2xl md:text-4xl font-bold capitalize">
                    {pokemon.name}
                  </h1>
                  <PokemonTypes types={pokemon.types} />
                </div>

                {/* Avatar */}
                <div className="rounded-2xl max-w-3xl p-8 md:p-20 relative">
                  <div
                    style={{
                      backgroundColor: `${
                        typeColors[pokemon.types[0].type.name]
                      }`,
                      opacity: 0.25,
                    }}
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  ></div>
                  <div className="aspect-square relative max-w-sm mx-auto z-10">
                    <Image
                      className="object-contain"
                      src={
                        (pokemon.sprites.other?.dream_world
                          ?.front_default as string) ??
                        (pokemon.sprites.front_default as string) ??
                        ""
                      }
                      alt={pokemon.name}
                      fill
                    />
                  </div>
                </div>
              </div>

              <div className="self-center xl:mt-32 space-y-10">
                {/* Weight and height */}
                <div className="flex gap-x-10 font-semibold text-lg md:text-2xl">
                  <p>{`Weight: ${pokemon.weight}hg`}</p>
                  <p>{`Height: ${pokemon.height}dm`}</p>
                </div>

                <PokemonStats stats={pokemon.stats} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Pokemon;

export const getStaticProps: GetStaticProps<{ pokemon: Pokemon }> = async (
  context
) => {
  const { params } = context;

  try {
    // get pokemon by id
    const pokemon = await await Api.getPokemonById(Number(params?.id));
    return {
      props: {
        pokemon: pokemon,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  // get first 20 pokemons
  const ids: string[] = [];

  for (var i = 1; i <= 20; i++) {
    ids.push(i.toString());
  }

  return {
    paths: ids.map((id) => {
      return {
        params: { id },
      };
    }),
    fallback: "blocking",
  };
};
