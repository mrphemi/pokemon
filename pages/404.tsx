import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="py-20 bg-white">
      <div className="wrapper space-y-8 h-[80vh] flex flex-col justify-center items-center">
        <div className="aspect-square w-40 mx-auto relative">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/88.svg"
            alt="psychduck image"
            fill
            className="object-contain"
          />
        </div>

        <h1 className="capitalize text-4xl font-bold text-center max-w-2xl">
          oops... you are in ghost land. click button below to return back to
          the living
        </h1>

        <Link
          className="py-4 px-6 bg-poke-light-blue rounded-xl text-white inline-block"
          href="/"
        >
          Back to Pokemon list
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
