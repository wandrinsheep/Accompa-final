import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//import { LocationTrackerProvider } from "../../providers/location-tracker/location-tracker";
import { LocationSelectPage } from "../location-select/location-select";
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';


declare var google:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 @ViewChild('map') mapElement: ElementRef;
 @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 user: Observable<firebase.User>

/*  constructor(public navCtrl: NavController, public locationTracker: LocationTrackerProvider) {
 
  }
 
  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }*/
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public backgroundgeolocation: BackgroundGeolocation,public maps:GoogleMapsProvider, public db: AngularFireAuth) {
 
  }
   ionViewDidLoad(): void {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
           let latLng = new google.maps.LatLng(17.942561394134792,-77.23381950414623);
              var marker1 = new google.maps.Marker({
              position: latLng,
              map: this.maps.map,
              title: 'Hello World!'
        });
           
 
          /*this.user=this.db.authState;
          this.user.subscribe(userdata=>{
          if(userdata){
            let config = {
             desiredAccuracy: 0,
             stationaryRadius: 20,
             distanceFilter: 10, 
             debug: true,
             interval: 2000,
            url: "https://accompa-me.firebaseio.com/geohistory/"+userdata.uid+".json",
            stopOnTerminate: false 
         };
 
    this.backgroundgeolocation.configure(config).subscribe((location) => {
       let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
       var marker1 = new google.maps.Marker({
          position: latLng,
          title: 'Hello World!'
        });
      marker1.setMap(this.maps.map)
    this.maps.map.setCenter(marker1.getPosition());
    console.log('BackgroundGeolocation:  ' + location.coords.latitude + ',' + location.coords.longitude);
 
    // Run update inside of Angular's zone
 
  }, (err) => {
 
    console.log('position err'+ err);
 
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundgeolocation.start();
          }
      })*/
 
        }); }
 

    launchLocationPage(){
 
        let modal = this.modalCtrl.create(LocationSelectPage);
 
        modal.onDidDismiss((location) => {
            console.log(location);
        });
 
        modal.present();    
 
    }


}
