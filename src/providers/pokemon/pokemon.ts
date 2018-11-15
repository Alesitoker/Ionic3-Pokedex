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

  pokeritos: Pokemon[] = [];

  constructor(public http: HttpClient) {
    
  }

  agregarAFavorito(pokemon: Pokemon) {
    this.pokeritos.push(pokemon);
  }

  getPokemonFavorito() {

  }


}
