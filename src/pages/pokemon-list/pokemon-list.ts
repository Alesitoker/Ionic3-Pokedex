import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';

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

  private pokemones: Observable<any[]>;
  private searchControl: FormControl;
  private twoTypes: boolean = false;
  private search: string = "";
  private nada: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private afDB: AngularFireDatabase, public menuCtrl: MenuController, public pokeVider: PokemonProvider) {
    this.pokemones = afDB.list('POKEMONES').valueChanges();
    this.searchControl = new FormControl();

    this.pokemones.subscribe(pokemon => {
      pokeVider.addPokemon(pokemon);
    });
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.subscribe(search => {
      this.filterPokemon();
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

  filterPokemon() {
    this.pokemones = this.pokemones.map(pokemones => {
      let fl = pokemones.filter(pokemon => pokemon.nombre.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || pokemon.pokedexNumber.toString().indexOf(this.search.toLowerCase()) !== -1);
      if (fl.length > 0) {
        this.nada = false;
      } else {
        this.nada = true;
      }
      return fl;
    });
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

}
