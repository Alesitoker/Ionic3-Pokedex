import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { POKEMONES } from '../../data/data_pokemones';
import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonDetailPage } from "../indexPages";
import { PokemonProvider } from "../../providers/pokemon/pokemon";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-pokemon-list',
  templateUrl: 'pokemon-list.html',
})
export class PokemonListPage {

  pokemones: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private afDB: AngularFireDatabase, public allPokemones: PokemonProvider) {
    this.pokemones = afDB.list('POKEMONES').valueChanges();

    this.pokemones.subscribe(pokemon => {
    allPokemones.addPokemon(pokemon);
  });
  }

  ionViewDidLoad() {

  }

  getPokemon(pokedexNumber: number) {
    return "assets/pokemones/"+pokedexNumber+".png";
  }

  openDetail(pokemon: Pokemon) {
    this.navCtrl.push(PokemonDetailPage, {"pokemon":pokemon});
  }

}
