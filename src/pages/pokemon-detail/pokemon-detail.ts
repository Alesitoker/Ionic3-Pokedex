import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { POKEMONES } from "../../data/data_pokemones";
import { TYPES } from "../../data/data_type";
import { Pokemon } from "../../interfaces/pokemonInterface";
import { Type } from "../../interfaces/typeInterface";
import { PokemonProvider } from "../../providers/pokemon/pokemon";

@IonicPage()
@Component({
  selector: 'page-pokemon-detail',
  templateUrl: 'pokemon-detail.html',
})
export class PokemonDetailPage {

  pokemones: Pokemon[] = [];
  types: Type[] = [];
  pokemon: Pokemon;
  type: Type[] = [];
  primero: boolean = false;
  ultimo: boolean = false;
  twoTypes: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pokeFv: PokemonProvider) {
    this.pokemones = POKEMONES.slice(0);
    this.types = TYPES.slice(0);

    this.iniciarPokemon(this.navParams.get("pokemon"));
    // console.log(this.pokemon);
    // console.log(this.type);
  }

  private iniciarPokemon(pokemon: Pokemon) {
    this.pokemon = pokemon;

    for (let i = 0; i < pokemon.type.length; i++) {
      this.type[i] = this.types[pokemon.type[i]-1];

      if (i == 1) {
        this.twoTypes = true;
      } else if (i == pokemon.type.length) {
        this.twoTypes = false;
      }
    }
  }

  getImgPokemon() {
    if (this.pokemon.pokedexNumber == this.pokemones[0].pokedexNumber) {
      this.primero = true;
    } else if (this.pokemon.pokedexNumber == this.pokemones[this.pokemones.length-1].pokedexNumber) {
      this.ultimo = true;
    } else {
      this.primero = false;
      this.ultimo = false;
    }
    return "assets/pokemones/other-sprites/official-artwork/"+this.pokemon.pokedexNumber+".png";
  }

  ponerFavorito() {
    this.pokemon.favorito = true;
    this.pokeFv.addFavorite(this.pokemon);
  }

  quitarFavorito() {
    this.pokemon.favorito = false;
    this.pokeFv.removeFavorite(this.pokemon);
  }

}
