import { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";

// import the PokemonClient
import { Pokemon } from "pokenode-ts";
import useSWR from "swr";
import { Waypoint } from "react-waypoint";

import { Api } from "@/lib/api";

import PokemonList from "@/components/PokemonList";
import SearchResultModal from "@/components/SearchResultModal";
import SearchForm from "@/components/SearchForm";
import BackToTopButton from "@/components/BackToTopButton";

export default function Home({
  pokemonList,
  nextPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Todo: Refactor states to two useReducers
  // List related states
  const [list, setList] = useState(pokemonList);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(Boolean(nextPage));
  const [loadMore, setLoadMore] = useState(false);

  // Search function related states
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(
    {} as Pokemon
  );
  const [displaySearchModal, setDisplaySearchModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");

  const resultsPerPage = 20;
  const offset = page * resultsPerPage;
  const max_results = 1000;

  const shouldLoadMore = loadMore && hasNextPage && offset < max_results;
  const shouldSearch = formSubmitted && searchString;

  // handles lazy loading new pokemons
  const { isLoading, error } = useSWR(
    shouldLoadMore ? ["getPokemons", offset, resultsPerPage] : null,
    () => Api.getListWithFullDetails(offset),
    {
      onSuccess(data) {
        setLoadMore(false);
        setList((prevList) => [...prevList, ...data.list]);
        setHasNextPage(Boolean(data.next));
        if (data.next !== null) {
          setPage((page) => page + 1);
        }
      },
    }
  );

  // request to search pokemons
  const {} = useSWR<Pokemon>(
    shouldSearch ? ["getPokemons", offset, resultsPerPage] : null,
    () => Api.getPokemonByName(searchString),
    {
      onSuccess(data) {
        setSearchErrorMessage("");
        setFormSubmitted(false);
        setSearchString("");
        setSearchResult(data);
        setDisplaySearchModal(true);
      },
      onError(err) {
        setSearchResult(null);
        setFormSubmitted(false);
        if (err.response.status === 404) {
          setSearchErrorMessage(`Pokemon with name ${searchString} not found`);
          setDisplaySearchModal(true);
          setSearchString("");
        } else {
          console.log(err.message);
        }
      },
    }
  );

  const closeModal = () => {
    setDisplaySearchModal(false);
  };

  return (
    <>
      <main className="py-20">
        <div className="wrapper">
          <h1 className="text-center text-3xl font-bold mb-10">Poke Search</h1>
          <SearchForm
            submit={() => {
              if (searchString) setFormSubmitted(true);
            }}
            onInputChange={setSearchString}
            searchString={searchString}
          />

          <PokemonList list={list} />

          {/* Lazy load component. Checks if its in view to load more pokemons */}
          <Waypoint onEnter={() => setLoadMore(true)}>
            <p className="mt-5 md:mt-10 text-lg font-bold text-center capitalize">
              {isLoading ? "loading new monsters ..." : ""}
              {error ? error : ""}
            </p>
          </Waypoint>

          {displaySearchModal && (
            <SearchResultModal
              onClose={closeModal}
              pokemon={searchResult}
              error={searchErrorMessage}
            />
          )}

          <BackToTopButton />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  pokemonList: Pokemon[];
  nextPage: string | null;
}> = async () => {
  const { list, next } = await await Api.getListWithFullDetails();

  return {
    props: {
      pokemonList: list,
      nextPage: next,
    },
    revalidate: 3600,
  };
};
