import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { POKEMONES } from "../../data/data_pokemones";
import { TYPES } from "../../data/data_type";
import { Pokemon } from "../../interfaces/pokemonInterface";
import { Type } from "../../interfaces/typeInterface";
import { PokemonProvider } from "../../providers/pokemon/pokemon";
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-pokemon-detail',
  templateUrl: 'pokemon-detail.html',
})
export class PokemonDetailPage {

  pokemones: any[] = [];
  pokemon: Pokemon;
  types: Type[] = [];
  primero: boolean = false;
  ultimo: boolean = false;
  twoTypes: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pokeFv: PokemonProvider) {
    this.pokemones = this.pokeFv.getAllPokemones();

    this.iniciarPokemon(this.navParams.get("pokemon"));
  }

  private iniciarPokemon(pokemon: Pokemon) {
    this.pokeFv.setCurrentPoke(pokemon);
    this.pokemon = this.pokeFv.getCurrentPoke();
  }

  getImgPokemon() {
    let pokemon = this.pokeFv.getCurrentPoke();
    this.pokemon = pokemon;

    if (pokemon.pokedexNumber == this.pokemones[0].pokedexNumber) {
      this.primero = true;
    } else if (pokemon.pokedexNumber == this.pokemones[this.pokemones.length-1].pokedexNumber) {
      this.ultimo = true;
    } else {
      this.primero = false;
      this.ultimo = false;
    }
    this.obtenerTipos(pokemon);
    return "assets/pokemones/other-sprites/official-artwork/"+pokemon.pokedexNumber+".png";
  }

  obtenerTipos(pokemon: Pokemon) {
    this.types = [];

    for (let i = 0; i < pokemon.type.length; i++) {
      this.types.push(this.pokeFv.getType(pokemon.type[i]-1));
    }

    if (this.types.length == 1) {
      this.twoTypes = false;
    } else {
      this.twoTypes = true;
    }

  }

  ponerFavorito() {
    let pokemon = this.pokeFv.getCurrentPoke();
    this.pokemon = pokemon;

    pokemon.favorito = true;
    this.pokeFv.addFavorite(pokemon);
  }

  quitarFavorito() {
    let pokemon = this.pokeFv.getCurrentPoke();

    pokemon.favorito = false;
    this.pokeFv.removeFavorite(pokemon);
  }

  next() {
    let pokemon = this.pokeFv.getCurrentPoke();
    let nextPokemon = pokemon.pokedexNumber;

    this.primero = false;

    if (nextPokemon < this.pokemones[this.pokemones.length-1].pokedexNumber) {
      this.pokeFv.setCurrentPoke(this.pokemones[nextPokemon]);
      this.pokemon = this.pokemones[nextPokemon];
      this.obtenerTipos(this.pokemon);
      // Si es el ultimo pokemon no mostramos la flecha siguiente.
      if (this.pokemones.length-1 == nextPokemon) {
        this.ultimo = true;
      }
    }
  }

  previous() {
    let pokemon = this.pokeFv.getCurrentPoke();
    let previousPokemon = pokemon.pokedexNumber-2;

    this.ultimo = false;

    if (previousPokemon >= 0) {
      this.pokeFv.setCurrentPoke(this.pokemones[previousPokemon]);
      this.pokemon = this.pokemones[previousPokemon];
      this.obtenerTipos(this.pokemon);
      // Si es el primer pokemon no mostramos la flecha anterior.
      if (previousPokemon == 0) {
        this.primero = true;
      }
    }
  }

  numberPokemon() {
    return this.pokeFv.numberPokemon(this.pokemon.pokedexNumber);
  }

  getColorType(type: Type) {
    return type.color;
  }
}
