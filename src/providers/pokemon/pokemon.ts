import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pokemon } from '../../interfaces/pokemonInterface';
/*
  Generated class for the PokemonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PokemonProvider {

  private pokeritos: Pokemon[] = [];

  constructor(public http: HttpClient) {

  }

  getPokemonsFavorite() {
    let favorite = this.pokeritos;
    return this.pokeritos;
  }

  getPokemonFavorite(pokemon: number) {
    return this.pokeritos[pokemon];
  }

  addFavorite(pokemon: Pokemon) {
    this.pokeritos.push(pokemon);
  }

  removeFavorite(pokemon: Pokemon) {
    let favorito = this.pokeritos.indexOf(pokemon);
    this.pokeritos.splice(favorito, 1);
  }

}
