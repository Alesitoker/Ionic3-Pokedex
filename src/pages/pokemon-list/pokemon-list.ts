import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { POKEMONES } from '../../data/data_pokemones';
import { Pokemon } from '../../interfaces/pokemonInterface';
import { PokemonDetailPage } from "../indexPages";
import { Type } from "../../interfaces/typeInterface";
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
  twoTypes: boolean = false;
  search: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private afDB: AngularFireDatabase, public menuCtrl: MenuController, public pokeVider: PokemonProvider) {
    this.pokemones = afDB.list('POKEMONES').valueChanges();

    this.pokemones.subscribe(pokemon => {
      pokeVider.addPokemon(pokemon);
    });

  }

  ionViewDidEnter() {
    this.pokeVider.yesSwipe();
  }

  ionViewWillLeave() {
    this.pokeVider.noSwipe();
  }

  mostrarMenu() {
    this.menuCtrl.toggle();
  }

  onChange() {
    console.log(this.search);
  }

  getPokemonImg(pokedexNumber: number) {
    return "assets/pokemones/other-sprites/official-artwork/"+pokedexNumber+".png";
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

  getType(pokemon: Pokemon) {
    let type: Type[] = [];

    for (let i = 0; i < pokemon.type.length; i++) {
      type.push(this.pokeVider.getType(pokemon.type[i]-1));
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

  openDetail(pokemon: Pokemon) {
    this.navCtrl.push(PokemonDetailPage, {"pokemon":pokemon});
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

}
