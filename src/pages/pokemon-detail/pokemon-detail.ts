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

  pokemones: any[] = [];
  pokemon: Pokemon;
  types: Type[] = [];
  type: Type[] = [];
  primero: boolean = false;
  ultimo: boolean = false;
  twoTypes: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private pokeFv: PokemonProvider, private afDB: AngularFireDatabase) {
    this.pokemones = this.pokeFv.getAllPokemones();
    this.types = TYPES.slice(0);

    this.iniciarPokemon(this.navParams.get("pokemon"));
  }

  ionViewDidEnter() {
    this.pokeFv.yesSwipe();
  }

  ionViewWillLeave() {
    this.pokeFv.noSwipe();
  }

  private iniciarPokemon(pokemon: Pokemon) {
    this.pokeFv.setCurrentPoke(pokemon);
    this.pokemon = this.pokeFv.getCurrentPoke();

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
    return "assets/pokemones/other-sprites/official-artwork/"+pokemon.pokedexNumber+".png";
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

  mostrarMenu() {
    this.menuCtrl.toggle();
  }

  next() {
    let pokemon = this.pokeFv.getCurrentPoke();
    let nextPokemon = pokemon.pokedexNumber;

    this.primero = false;

    if (nextPokemon < this.pokemones[this.pokemones.length-1].pokedexNumber) {
      this.pokeFv.setCurrentPoke(this.pokemones[nextPokemon]);
      this.pokemon = this.pokemones[nextPokemon];
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
      // Si es el primer pokemon no mostramos la flecha anterior.
      if (previousPokemon == 0) {
        this.primero = true;
      }
    }
  }
}
