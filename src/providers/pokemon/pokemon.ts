import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Pokemon } from '../../interfaces/pokemonInterface';

@Injectable()
export class PokemonProvider {

  private pokeritos: Pokemon[] = [];
  private allPokemones: any[] = [];
  private currentpoke: Pokemon;
  private types: any[] = [];
  private swipeMenu: boolean = false;

  constructor(public http: HttpClient, private afDB: AngularFireDatabase) {
    // Obtenemos los datos de la base de datos.
    let types = this.afDB.list('TYPES').valueChanges();
    // Guardamos los datos en types.
    types.subscribe(type => {this.types.push(type)});
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
  }

  removeFavorite(pokemon: Pokemon) {
    let favorito = this.pokeritos.indexOf(pokemon);
    pokemon.favorito = false;
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

  getType(type: number) {
    return this.types[0][type];
  }

}
