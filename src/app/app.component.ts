import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
   user: Observable<firebase.User>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public af: AngularFireAuth) {
    platform.ready().then(() => {
      this.user= af.authState;
       
       this.user.subscribe(data =>{
   if(data)
  {
      this.rootPage = TabsPage;
     // console.log(this.auth.isAuthenticated());
     // console.log(JSON.stringify(data));
    }
  else{
    this.rootPage = LoginPage;
    console.log(JSON.stringify(data));
  }
    })
     statusBar.styleDefault();
      splashScreen.hide();
    
  })}
  }
     
