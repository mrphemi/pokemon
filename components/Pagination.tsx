import Link from "next/link";
import { useRouter } from "next/router";

const Pagination = () => {
  const router = useRouter();
  const pokemonId = Number(router.query.id);
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        {pokemonId > 1 && (
          <Link
            href={`/pokemon/${pokemonId - 1}`}
            className="text-2xl md:text-4xl font-bold"
            title="Previous Pokemon"
          >
            <span>&#8592;</span>
          </Link>
        )}

        <Link href="/" className="mx-auto text-center capitalize font-semibold">
          back to list
        </Link>

        {pokemonId < 1000 && (
          <Link
            href={`/pokemon/${pokemonId + 1}`}
            className="text-2xl md:text-4xl font-bold"
            title="Next Pokemon"
          >
            <span>&#8594;</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
