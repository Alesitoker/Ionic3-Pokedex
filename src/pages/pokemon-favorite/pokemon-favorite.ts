import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, MenuController } from 'ionic-angular';
import { Type } from "../../interfaces/typeInterface";

import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonProvider } from "../../providers/pokemon/pokemon";
import { PokemonDetailPage } from "../indexPages";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private pokeritos: PokemonProvider, public menuCtrl: MenuController) {

  }

  ionViewWillEnter() {
    this.moreOne();
  }

  ionViewDidEnter() {
    this.pokeritos.yesSwipe();
  }

  ionViewWillLeave() {
    this.pokeritos.noSwipe();
  }

  mostrarMenu() {
    this.menuCtrl.toggle();
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

  quitarFavorito(index: number) {
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

  openDetail(pokemon: Pokemon) {
    this.navCtrl.push(PokemonDetailPage, {"pokemon":pokemon});
  }

}
