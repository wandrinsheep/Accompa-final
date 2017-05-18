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
 geoQuery: any;

/*  constructor(public navCtrl: NavController, public locationTracker: LocationTrackerProvider) {
 
  }
 
  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }*/
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public backgroundgeolocation: BackgroundGeolocation,public maps:GoogleMapsProvider, public db: AngularFireAuth, private geolocation:Geolocation) {
 
  }
   ionViewDidLoad(): void {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
          let options = {
              frequency: 6000, 
               enableHighAccuracy: true
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
              radius: 1609,    
              fillColor: '#87CEFA',
              fillOpacity: 0.35,
                    });
                    circle.bindTo('center',marker1,'position');
          this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) =>{ 
     
               console.log(position);
               let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
               marker1.setPosition(latLng);
               this.maps.map.setCenter(marker1.getPosition());
               
        //-----------------------------Query other locations---------------------------------
               if (this.geoQuery) {
    // If the GeoQuery already exists, the user's location has moved, and we
    // should update the GeoQuery's center
                  this.geoQuery.updateCriteria({
                    center: marker1.getPosition()
                                      });
                             } 
                else {
    // If this is the first time retrieving the user's location, create a new GeoQuery
    // instance and set up our key_entered event listener
                    this.geoQuery = this.geoFire.query(
                      {center: marker1.getPosition(), radius: 2}
                          );
                  }
           
 
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


}
