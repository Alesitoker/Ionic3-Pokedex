import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonProvider } from "../../providers/pokemon/pokemon";

@IonicPage()
@Component({
  selector: 'page-pokemon-favorite',
  templateUrl: 'pokemon-favorite.html',
})
export class PokemonFavoritePage {



  constructor(public navCtrl: NavController, public navParams: NavParams, private pokeritos: PokemonProvider) {

  }

  getPokemon(pokedexNumber: number) {
    return "assets/pokemones/"+pokedexNumber+".png";
  }
}
