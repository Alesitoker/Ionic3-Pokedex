import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PokemonListPage, PokemonFavoritePage } from '../indexPages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any = PokemonListPage;
  tab2: any = PokemonFavoritePage;
  icon: string = "pokedex";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  changeTab(selected: number) {
    if (selected == 0) {
      this.icon = "pokedex";
    } else {
      this.icon = "pokedexSfn";
    }
  }

}
