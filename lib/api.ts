import { Pokemon, PokemonClient } from "pokenode-ts";

export class Api {
  static client: PokemonClient = new PokemonClient();

  static async getListWithFullDetails(
    offset: number = 0,
    limit: number = 20
  ): Promise<{
    list: Pokemon[];
    next: string | null;
  }> {
    const list = await this.client.listPokemons(offset, limit);

    // Create an array of requests that will be passed to promise.all
    let requests: any[] = [];

    list.results.forEach(async (pokemon) => {
      requests.push(this.client.getPokemonByName(pokemon.name));
    });

    // Use promise.all to fetch all requests in parallel
    return Promise.all(requests).then((results) => {
      return { list: results, next: list.next };
    });
  }

  static async getPokemonByName(name: string): Promise<Pokemon> {
    const pokemon = await this.client.getPokemonByName(
      name.toLocaleLowerCase()
    );
    return pokemon;
  }

  static async getPokemonById(id: number): Promise<Pokemon> {
    const pokemon = await this.client.getPokemonById(id);
    return pokemon;
  }
}
