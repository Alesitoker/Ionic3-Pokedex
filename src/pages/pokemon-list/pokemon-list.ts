import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { POKEMONES } from '../../data/data_pokemones';
import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonDetailPage } from "../indexPages";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-pokemon-list',
  templateUrl: 'pokemon-list.html',
})
export class PokemonListPage {

  pokemones: Observable<any[]>;
  imgPokemones: string[] = [];
  shiny: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private afDB: AngularFireDatabase) {
    this.pokemones = afDB.list('POKEMONES').valueChanges();
  }

  ionViewDidLoad() {

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
    return "assets/pokemones/"+pokedexNumber+".png";
  }

  openDetail(pokemon: Pokemon) {
    this.navCtrl.push(PokemonDetailPage, {"pokemon":pokemon});
  }

}
