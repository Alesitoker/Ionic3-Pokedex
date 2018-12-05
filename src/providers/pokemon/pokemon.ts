import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pokemon } from '../../interfaces/pokemonInterface';

@Injectable()
export class PokemonProvider {

  private pokeritos: Pokemon[] = [];
  private allPokemones: any[] = [];
  private currentpoke: Pokemon;
  private swipeMenu: boolean = false;
  private emptyPokeritos: boolean = true;

  constructor(public http: HttpClient) {

  }

  setCurrentPoke(pokemon: Pokemon) {
    this.currentpoke = pokemon;
  }

  getCurrentPoke() {
    return this.currentpoke;
  }

  getPokemonsFavorite() {
    return this.pokeritos;
  }

  getPokemonFavorite(pokemon: number) {
    return this.pokeritos[pokemon];
  }

  addPokemon(pokemon: any) {
    this.allPokemones.push(pokemon);
  }

  getAllPokemones() {
    return this.allPokemones[0];
  }

  addFavorite(pokemon: Pokemon) {
    this.pokeritos.push(pokemon);
    this.isEmpty();
  }

  removeFavorite(pokemon: Pokemon) {
    let favorito = this.pokeritos.indexOf(pokemon);
    pokemon.favorito = false;
    this.pokeritos.splice(favorito, 1);
    this.isEmpty();
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

  getEmptyPokeritos() {
    return this.emptyPokeritos;
  }

  private isEmpty() {
    this.emptyPokeritos = this.pokeritos.length > 1 ? false : true;
  }

}
