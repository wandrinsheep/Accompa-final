import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { AuthProvider } from "../../providers/auth/auth";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

 user: Observable<firebase.User>;;
items:any;
  constructor(public navCtrl: NavController, private auth: AuthProvider, private af: AngularFireAuth, private data: AngularFireDatabase) {
    
    /* this.user =this.af.authState
     this.user.subscribe(authData => {
        if (authData) {
       this.data.list('users/'+authData.uid+'/friends').forEach((friend)=>{friend.forEach((idkey)=>{this.items.name = idkey.$value;
      console.log(idkey.$value) })})}});*/
      this.user =this.af.authState
     this.user.subscribe(authData => {
        if (authData) {
      this.items= this.data.list('users/'+authData.uid+'/friends')}});
     
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
