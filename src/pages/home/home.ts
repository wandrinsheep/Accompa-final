import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//import { LocationTrackerProvider } from "../../providers/location-tracker/location-tracker";
import { LocationSelectPage } from "../location-select/location-select";
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import GeoFire from 'geofire'; 
import { AngularFireDatabase } from "angularfire2/database";



declare var google:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 @ViewChild('map') mapElement: ElementRef;
 @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 user: Observable<firebase.User>;
 watch:any;
 firebaseRef = firebase.database().ref('geolocation');
 geoFire = new GeoFire(this.firebaseRef);
 lasttime = 0;
 geoQuery = this.geoFire.query(
                      {center: [0,0], radius: 3}
                        );
markers = []; 
notexists:boolean = false;
            


/*  constructor(public navCtrl: NavController, public locationTracker: LocationTrackerProvider) {
 
  }
 
  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }*/
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public backgroundgeolocation: BackgroundGeolocation,public maps:GoogleMapsProvider, public auth: AngularFireAuth, private geolocation:Geolocation, public db: AngularFireDatabase) {
    
 
  }
   ionViewDidLoad(): void {

        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
          let options = {
               enableHighAccuracy: true,
               maximumAge:600000
                        };

             var marker1 = new google.maps.Marker({
              map: this.maps.map,
              position:this.maps.map.getCenter(),
              title: 'Hello World!'
            });
            let circle = new google.maps.Circle({
              map: this.maps.map,
              strokeOpacity: 0.6,
              strokeWeight: 1,
              strokeColor: '#00BFFF',
              radius: 250,    
              fillColor: '#87CEFA',
              fillOpacity: 0.35,
                    });
              circle.bindTo('center',marker1,'position');

          
            
               //----------------------geofire initialisation-------------------
              
              
    // If this is the first time retrieving the user's location, create a new GeoQuery
    // instance and set up our key_entered event listener
              
                   
              //-----------------------------
         // this.geolocation.getCurrentPosition().then(res=>{this.lasttime = res.timestamp});
           
        this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) =>{ 
    
             
               console.log(position);
               let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
               let  geolatLang = [position.coords.latitude,position.coords.longitude];
               marker1.setPosition(latLng);
               this.maps.map.setCenter(marker1.getPosition());
              
        //-----------------------------Query other locations---------------------------------
               
               
              // this.lasttime = position.timestamp;
                 this.geoQuery.updateCriteria({center: geolatLang});
                 this.user = this.auth.authState;
                 this.user.subscribe(info=>{
                   this.geoFire.set(info.uid,geolatLang).then (data =>{ 
                    console.log("data set");
                  });

                  this.geoQuery.on("key_entered", (keys)=>{
                    
                      if(this.markers.some((val)=>{if(val ===keys){return true}}))
                      {
                       console.log('duplicate');
                      }
                      else { 
                        if(keys !== info.uid)
                        this.markers.push(keys)
                      }
                    });

                    this.geoQuery.on("key_exited", (keys)=>{
                    
                      if(this.markers.some((val)=>{if(val ===keys){return true}}))
                      {
                       this.markers.splice(this.markers.indexOf(keys));
                       console.log('key removed'+keys );
                      }
                    });
                  })
                  
                   
                 
                console.log(this.markers);
               /*  this.geoFire.set('ROfjVAqfJ9Qgm0QKq1mJOTBGuRI3',geolatLang).then (data =>{ 
                    console.log("data set");
                  });*/

               
      // ... look up the restaurant data for that key ...
              
              
                  
                  //console.log('markers keys '+ this.markers.values); 
           /*  if(position.timestamp-this.lasttime<3000){
                
                console.log(this.lasttime&&position.timestamp-this.lasttime);
                console.log('ignored update');
              }*/
              /*else
              {
                this.lasttime = position.timestamp;
                 this.geoQuery.updateCriteria({center: geolatLang});
                let posdata = this.auth.authState.subscribe(data =>{
                 this.geoFire.set(data.uid,geolatLang).then (data =>{ 
                    console.log("data set");
                  })
                 this.geoQuery.on("key_entered", (key,location)=> {
                 
                    this.markers.push(key);
                    console.log('markers keys '+ this.markers.keys); 
      // ... look up the restaurant data for that key ...
                })
                
                 });
                  
                  console.log('markers keys '+ this.markers.keys); 
                   posdata.unsubscribe(); 
              }*/
             
               
         },
         err=>{console.log(err);}
          )
        },
        (err)=>{console.log(err)}
        )}
 

    launchLocationPage(){
 
        let modal = this.modalCtrl.create(LocationSelectPage);
 
        modal.onDidDismiss((location) => {
            console.log(location);
        });
 
        modal.present();    
 
    }
    exists(key, index, array){
      if(array[index] ===key)
      {
        return true;
      }
     else{
       false;
     }

    }

    
    
   

}
