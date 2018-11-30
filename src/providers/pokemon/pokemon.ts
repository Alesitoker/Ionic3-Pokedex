import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pokemon } from '../../interfaces/pokemonInterface';

@Injectable()
export class PokemonProvider {

  private pokeritos: Pokemon[] = [];
  private swipeMenu: boolean = false;

  constructor(public http: HttpClient) {

  }

  getPokemonsFavorite() {
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

  noSwipe() {
    this.swipeMenu = false;
  }

  yesSwipe() {
    this.swipeMenu = true;
  }

  isSwipeMenu() {
    return this.swipeMenu;
  }

}
