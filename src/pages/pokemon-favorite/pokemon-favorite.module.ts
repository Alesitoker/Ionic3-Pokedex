import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PokemonFavoritePage } from './pokemon-favorite';

@NgModule({
  declarations: [
    PokemonFavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(PokemonFavoritePage),
  ],
})
export class PokemonFavoritePageModule {}
