import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { POKEMONES } from '../../data/data_pokemones';
import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonDetailPage } from "../indexPages";
/**
 * Generated class for the PokemonListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokemon-list',
  templateUrl: 'pokemon-list.html',
})
export class PokemonListPage {

  pokemones: Pokemon[] = [];
  imgPokemones: string[] = [];
  shiny: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pokemones = POKEMONES.slice(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PokemonListPage');
  }

  changeShiny(pokedexNumber: number) {
    let poke = pokedexNumber-1;
    if (this.shiny) {
      this.shiny = false;
      this.pokemones[poke].favorito = false;
    } else {
      this.shiny = true;
      this.pokemones[poke].favorito = true;
    }
    console.log(poke);
  }

  getPokemon(pokedexNumber: number) {
    let poke = pokedexNumber-1;
    return !this.pokemones[poke].favorito ? "assets/pokemones/"+pokedexNumber+".png":"assets/pokemones/shiny/"+pokedexNumber+".png";
  }

  openDetail(pokemon: Pokemon) {
    this.navCtrl.push(PokemonDetailPage, {"pokemon":pokemon});
  }

}
