import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage, MovimientosPage, LocalizacionPage, DescripcionPokedexPage, TutorialPage } from "../pages/indexPages";
import { PokemonProvider } from "../providers/pokemon/pokemon";
import { TutorialpProvider } from '../providers/tutorialp/tutorialp';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = TutorialPage;
  mov: any = MovimientosPage;
  location: any = LocalizacionPage;
  description: any = DescripcionPokedexPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController, private swipe: PokemonProvider, private tutorial: TutorialpProvider) {
    platform.ready().then(() => {
      this.tutorial.cargarStorage().then(() => {
        if (this.tutorial.tutorial.mostrarTutorial) {
          this.rootPage = TutorialPage;
        } else {
          this.rootPage = TabsPage;
        }

        statusBar.styleDefault();
        splashScreen.hide();
      });

    });
  }

  abrirPagina(pagina: any) {
    this.nav.push(pagina);
    this.menuCtrl.close();
  }
}
