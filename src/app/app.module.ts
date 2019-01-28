import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PokemonProvider } from '../providers/pokemon/pokemon';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailPage, PokemonFavoritePage, PokemonListPage,
  TabsPage, MovimientosPage, LocalizacionPage, DescripcionPokedexPage, TutorialPage } from "../pages/indexPages";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage';
import { TutorialpProvider } from '../providers/tutorialp/tutorialp';


export const firebaseConfig = {
    apiKey: "AIzaSyBvvIG8cffCwrmvwHS5Hq9svFAFpRNrR2I",
    authDomain: "pokedex-1f28e.firebaseapp.com",
    databaseURL: "https://pokedex-1f28e.firebaseio.com",
    projectId: "pokedex-1f28e",
    storageBucket: "pokedex-1f28e.appspot.com",
    messagingSenderId: "837915243340"
};

@NgModule({
  declarations: [
    MyApp,
    PokemonDetailPage,
    PokemonFavoritePage,
    PokemonListPage,
    TabsPage,
    MovimientosPage,
    LocalizacionPage,
    DescripcionPokedexPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PokemonDetailPage,
    PokemonFavoritePage,
    PokemonListPage,
    TabsPage,
    MovimientosPage,
    LocalizacionPage,
    DescripcionPokedexPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PokemonProvider,
    TutorialpProvider
  ]
})
export class AppModule {}
