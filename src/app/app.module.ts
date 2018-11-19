import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PokemonProvider } from '../providers/pokemon/pokemon';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailPage, PokemonFavoritePage, PokemonListPage, TabsPage } from "../pages/indexPages";

@NgModule({
  declarations: [
    MyApp,
    PokemonDetailPage,
    PokemonFavoritePage,
    PokemonListPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PokemonDetailPage,
    PokemonFavoritePage,
    PokemonListPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PokemonProvider
  ]
})
export class AppModule {}
