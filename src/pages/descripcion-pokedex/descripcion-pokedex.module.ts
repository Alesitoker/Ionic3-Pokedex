import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescripcionPokedexPage } from './descripcion-pokedex';

@NgModule({
  declarations: [
    DescripcionPokedexPage,
  ],
  imports: [
    IonicPageModule.forChild(DescripcionPokedexPage),
  ],
})
export class DescripcionPokedexPageModule {}
