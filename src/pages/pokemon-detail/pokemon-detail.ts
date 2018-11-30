import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { POKEMONES } from "../../data/data_pokemones";
import { TYPES } from "../../data/data_type";
import { Pokemon } from "../../interfaces/pokemonInterface";
import { Type } from "../../interfaces/typeInterface";
import { PokemonProvider } from "../../providers/pokemon/pokemon";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private pokeFv: PokemonProvider, private afDB: AngularFireDatabase) {
    this.pokemones = POKEMONES.slice();
    this.types = TYPES.slice(0);

    this.iniciarPokemon(this.navParams.get("pokemon"));
  }

  ionViewDidLoad() {
    this.pokeFv.yesSwipe();
  }

  ionViewWillUnload() {
    this.pokeFv.noSwipe();
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

  mostrarMenu() {
    this.menuCtrl.toggle();
  }

  next() {
    let nextPokemon = this.pokemon.pokedexNumber;
    this.primero = false;

    if (nextPokemon < 151) {
      this.pokemon = this.pokemones[nextPokemon];
      // Si es el ultimo pokemon no mostramos la flecha siguiente.
      if (this.pokemones.length-1 == nextPokemon) {
        this.ultimo = true;
      }
    }
  }

  previous() {
    let previousPokemon = this.pokemon.pokedexNumber-2;
    this.ultimo = false;

    if (previousPokemon >= 0) {
      this.pokemon = this.pokemones[previousPokemon];
      // Si es el primer pokemon no mostramos la flecha anterior.
      if (previousPokemon == 0) {
        this.primero = true;
      }
    }
  }
}
