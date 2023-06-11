import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  getPokemons() {
    let correctPokemon: any = {};

    const requests = [];

    for (let i = 0; i < 4; i++) {
      const numeroRandom = Math.floor(Math.random() * 600) + 1;
      requests.push(
        this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${numeroRandom}/`).pipe(
          map(pokemon => ({
            name: pokemon.name,
            sprites: pokemon.sprites.other["official-artwork"].front_default
          }))
        )
      );
    }

    return forkJoin(requests).pipe(
      map(pokemonsArray => {
        const pokemonData = { pokemons: pokemonsArray, correctPokemon: pokemonsArray[Math.floor(Math.random() * 4)] };
        return pokemonData;
      })
    );
  }
}