import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { DataProvider } from "../../providers/data";
import { LocationProvider } from "../../providers/location";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthProvider } from "../../providers/auth/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { FriendsPage } from "../friends/friends";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 user: Observable<firebase.User>;
  items : any;
  constructor(public navCtrl: NavController, private auth: AuthProvider, private af: AngularFireAuth, private data: AngularFireDatabase) 
  {
     //this.items = this.af.database.object('users/x3cirdMgNhdnKRl5j4elOb08evP2');
     this.user =this.af.authState
     this.user.subscribe(authData => {
        if (authData) {
       this.items = this.data.object('users/'+authData.uid);
        }
     });
    
  }

  /*getdata(){
     this.users = this.auth.getUserData();
     
        }
*/
  changeName(){
      this.user.subscribe(authData => {
        if (authData) {
    this.data.object('users/'+authData.uid).update({name: "John Wick"})
  }
      });
  }

    
 logout()
 {
   this.auth.Signout();
  //this.af.auth.logout().then(data => {console.log('user signed out')});
 }
 toFriends(){
   this.navCtrl.push(FriendsPage);
 }
}