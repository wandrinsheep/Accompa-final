import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//import { LocationTrackerProvider } from "../../providers/location-tracker/location-tracker";
import { LocationSelectPage } from "../location-select/location-select";
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 @ViewChild('map') mapElement: ElementRef;
 @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

/*  constructor(public navCtrl: NavController, public locationTracker: LocationTrackerProvider) {
 
  }
 
  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }*/
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,/*public maps: GoogleMapsProvider*/) {
 
  }
 /*ionViewDidLoad(): void {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).catch(err=>{console.log('there is a problem initialising map'+err)});
  }*/

    launchLocationPage(){
 
        let modal = this.modalCtrl.create(LocationSelectPage);
 
        modal.onDidDismiss((location) => {
            console.log(location);
        });
 
        modal.present();    
 
    }


}
