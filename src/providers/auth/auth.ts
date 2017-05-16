import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Facebook} from '@ionic-native/facebook';
import {AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operator/map";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
   retrievedfriends: string[];
  constructor(private fb:Facebook, private afauth:AngularFireAuth, private af: AngularFireDatabase) {
   
                            
  }

  loginwithFacebook(){
     this.fb.login(['email','user_friends','public_profile']).then((_response) => 
     { 
         let yourfriend:any;
         
          this.fb.api('me/friends',[]).then(data=>
          {
             
            
             if(data.data !== undefined || data.data !== null ){  
                     let creds = firebase.auth.FacebookAuthProvider.credential(_response.authResponse.accessToken);
                     this.afauth.auth.signInWithCredential(creds).then(firebaseData=>{
                     this.af.list('users').update(firebaseData.uid, {
                     email: firebaseData.email,
                     provider: 'facebook',
                     image: firebaseData.photoURL,
                    facebookid: _response.authResponse.userID,
                    name:firebaseData.displayName,  
                     trustscore:10
                                           });
                    let friendkey;
                    data.data.forEach(element => {
                      let name = element.name;
                      let id = String(element.id);
                        let mynode = this.af.list('users/'+firebaseData.uid).$ref.ref.child('friends').update(
                          { [id] :name });
                    
                       let yournode= this.af.list('users').$ref.orderByChild('/facebookid').equalTo(id).once
                       ('value',(node)=>{node.forEach((childnode)=>{
                         console.log(childnode.key);
                         childnode.ref.child('friends').update({[_response.authResponse.userID]:firebaseData.displayName}).then;
                         //friendkey=childnode.key
                         return true})});
                      
                   }) ;
                   
               }).catch(err=>{console.log(err)})
             }
             else{
                     let creds = firebase.auth.FacebookAuthProvider.credential(_response.authResponse.accessToken);
                     this.afauth.auth.signInWithCredential(creds).then(firebaseData=>{
                     this.af.list('users').update(firebaseData.uid, {
                     email: firebaseData.email,
                     provider: 'facebook',
                     image: firebaseData.photoURL,
                      name:firebaseData.displayName,
                     trustscore:10
            });
          }).catch(err => {'there was a error with login'+ err}); }
            
        })
        .catch((_error) => { console.log(_error) });
          
        
           }).catch(err => {console.log(err)});

          
                    
          
    }

  }
  


