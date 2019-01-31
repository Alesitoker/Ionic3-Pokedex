import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, ToastController } from 'ionic-angular';
import { Type } from "../../interfaces/typeInterface";

import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonProvider } from "../../providers/pokemon/pokemon";

@IonicPage()
@Component({
  selector: 'page-pokemon-favorite',
  templateUrl: 'pokemon-favorite.html',
})
export class PokemonFavoritePage {

  private ordenando: boolean = false;
  private sortIconStyle: string = "sortIcon";
  private oneFavorite: boolean = true;
  private twoTypes: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private pokeritos: PokemonProvider, private toastCtrl: ToastController) {

  }

  ionViewWillEnter() {
    this.moreOne();
  }

  getPokemon(pokedexNumber: number) {
    return "assets/pokemones/other-sprites/official-artwork/"+pokedexNumber+".png";
  }

  reordenarFavoritos(ordenacion: any) {
    let favoritos = this.pokeritos.getPokemonsFavorite();
    favoritos = reorderArray(this.pokeritos.getPokemonsFavorite(), ordenacion);
  }

  ordenar() {
    if (this.ordenando) {
      this.ordenando = false;
      this.sortIconStyle = "sortIcon";
    } else {
      this.ordenando = true;
      this.sortIconStyle = "sortIconClicked";
    }
  }

  borrarPokemon(index: number) {
    let pokemon = this.pokeritos.getPokemonFavorite(index);
    this.pokeritos.removeFavorite(pokemon);
    this.moreOne();
  }

  isEmpty() {
    return this.pokeritos.getPokemonsFavorite().length == 0;
  }

  private moreOne() {
    this.oneFavorite = this.pokeritos.getPokemonsFavorite().length > 1;
  }

  getType(pokemon: Pokemon) {
    let type: Type[] = [];

    for (let i = 0; i < pokemon.type.length; i++) {
      type.push(this.pokeritos.getType(pokemon.type[i]-1));
    }

    if (type.length == 1) {
      this.twoTypes = false;
    } else {
      this.twoTypes = true;
    }

    return type;
  }

  getColorType(type: Type) {
    return type.color;
  }

  numberPokemon(pokedexNumber: number) {
    let number;

    if (pokedexNumber < 10) {
      number = "00"+pokedexNumber;
    } else if (pokedexNumber < 100) {
      number = "0"+pokedexNumber;
    } else {
      number = pokedexNumber;
    }

    return number;
  }

}
