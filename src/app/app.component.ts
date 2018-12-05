import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage, MovimientosPage, LocalizacionPage, DescripcionPokedexPage } from "../pages/indexPages";
import { PokemonProvider } from "../providers/pokemon/pokemon";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  mov: any = MovimientosPage;
  location: any = LocalizacionPage;
  description: any = DescripcionPokedexPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private swipe: PokemonProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina(pagina: any) {
    this.nav.push(pagina);
    this.menuCtrl.close();
  }
}
