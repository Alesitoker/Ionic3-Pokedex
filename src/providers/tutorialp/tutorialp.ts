import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class TutorialpProvider {

  tutorial = {
      mostrarTutorial: true
    }
  private slides: Slide[] = [];

  constructor(public http: HttpClient, private platform: Platform, private storage: Storage, private afDB: AngularFireDatabase) {

  }

  cargarStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {

        this.storage.ready().then(() => {
          this.storage.get("tutorial").then( tutorial => {
            if (tutorial) {
              this.tutorial = tutorial;
            }
            resolve();
          });
        });

      } else {
        if (localStorage.getItem("tutorial")) {
          this.tutorial = JSON.parse(localStorage.getItem("tutorial"));
        }
        resolve();
      }
    });

  }

  guardarStorage() {
    if (this.platform.is('cordova')) {
      this.storage.set("tutorial", this.tutorial);
    } else {
      localStorage.setItem("tutorial", JSON.stringify(this.tutorial));
    }
  }

  getSlides() {
    return new Promise((resolve, reject) => {
      if (this.slides.length == 0) {
        this.afDB.list('TUTORIAL').valueChanges().subscribe( (data: Slide[]) => {
              this.slides = data;
              resolve(this.slides);
        });
      } else {
        resolve(this.slides);
      }
    });
  }

}

interface Slide {
  title: string;
  description: string;
  image: string;
}
