import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, ToastController } from 'ionic-angular';

import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonProvider } from "../../providers/pokemon/pokemon";

@IonicPage()
@Component({
  selector: 'page-pokemon-favorite',
  templateUrl: 'pokemon-favorite.html',
})
export class PokemonFavoritePage {

  ordenando: boolean = false;
  sortIconStyle: string = "sortIcon";


  constructor(public navCtrl: NavController, public navParams: NavParams, private pokeritos: PokemonProvider, private toastCtrl: ToastController) {

  }

  getPokemon(pokedexNumber: number) {
    return "assets/pokemones/"+pokedexNumber+".png";
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
    this.toastCtrl.create({
    message: pokemon.nombre+' ha sido borrado de favoritos',
    duration: 3000,
    position: 'bottom'
  }).present();
    this.pokeritos.removeFavorite(pokemon);
  }

}
