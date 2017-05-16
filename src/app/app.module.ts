import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationSelectPage } from "../pages/location-select/location-select";
import { LoginPage } from "../pages/login/login";

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import {Facebook} from '@ionic-native/facebook';
import { FriendsPage } from "../pages/friends/friends";

var firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBP9__r9I3MpOlLy4UWjQQLFLXyYfr-hjc",
    authDomain: "accompa-me.firebaseapp.com",
    databaseURL: "https://accompa-me.firebaseio.com",
    projectId: "accompa-me",
    storageBucket: "accompa-me.appspot.com",
    messagingSenderId: "514304181087"
  }
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LocationSelectPage,
    LoginPage,
    FriendsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LocationSelectPage,
    LoginPage,
    FriendsPage
  ],
  providers: [
    Facebook,
    Geolocation,
    BackgroundGeolocation,
    Network,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider,
    ConnectivityServiceProvider,
    GoogleMapsProvider,
    AuthProvider
  ]
})
export class AppModule {}
