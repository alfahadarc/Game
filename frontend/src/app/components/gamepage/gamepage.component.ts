import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";

import { Router, NavigationExtras } from "@angular/router";

import { Gamedata } from "../../gamedata.model";
import { GamedataService } from "../../gamedata.service";
import { DataStorage } from "../../dataprovider.service";
@Component({
  selector: "app-gamepage",
  templateUrl: "./gamepage.component.html",
  styleUrls: ["./gamepage.component.css"],
})
export class GamepageComponent implements OnInit {
  highest: Gamedata;
  highScore: Number;
  highScorePlayer: String;
  constructor(
    private gamedataService: GamedataService,
    private router: Router
  ) {
    this.getHighest();
  }

  isvisibleRules = false;
  isvisibleDie = true;

  point = 0;
  heart = 6;
  heart_1 = false;
  heart_2 = false;
  heart_3 = false;

  startflag = 0;

  backendphoto: any;

  getHighest() {
    this.gamedataService.getHighest().subscribe((data: Gamedata) => {
      this.highest = data;
      this.highScore = this.highest.score;
      this.highScorePlayer = this.highest.name;
    });
  }

  hideRules() {
    this.isvisibleRules = !this.isvisibleRules;
    this.playback();
    this.startflag = 1;
  }

  heartgone() {
    if (this.heart >= 3 && this.heart < 5) {
      this.heart_1 = true;
    } else if (this.heart >= 1 && this.heart < 3) {
      this.heart_2 = true;
    } else if (this.heart === 0) {
      this.heart_3 = true;
      this.isvisibleDie = false;
      this.pauseback();
      this.playflat();
      setTimeout(() => {
        this.gamedataService.storage(this.point);
        this.router.navigate(["home"]);
      }, 4000);
    } else {
      //console.log("Game Over");
    }
  }

  mario() {
    if (this.heart > 0 && this.startflag === 1) {
      this.heart++;
      this.point += 10;
      this.playclick();
      this.heartgone();
    }
  }

  luigi() {
    if (this.heart > 0 && this.startflag === 1) {
      this.heart++;
      this.point += 5;
      this.playclick();
      this.heartgone();
    }
  }

  road() {
    if (this.heart > 0 && this.startflag === 1) {
      this.heart--;
      this.heartgone();
    }
  }

  audioObj_back = new Audio();
  audioObj_flat = new Audio();
  audioObj_click = new Audio();

  playback() {
    this.audioObj_back.src = "../../assets/music/ajaira song.mp3";
    this.audioObj_back.load();
    this.audioObj_back.play();
    this.audioObj_back.loop = true;
  }

  pauseback() {
    this.audioObj_back.pause();
    this.audioObj_back.loop = false;
  }

  playflat() {
    this.audioObj_flat.src = "../../assets/music/Flat Tire.mp3";
    this.audioObj_flat.load();
    this.audioObj_flat.play();
  }

  playclick() {
    this.audioObj_click.src = "../../assets/music/Click.mp3";
    this.audioObj_click.load();
    this.audioObj_click.play();
  }

  get_Photo() {
    this.gamedataService.getPhoto().subscribe((res) => {
      this.backendphoto = this.gamedataService.uri + "\\" + res;
    });
  }

  ngOnInit() {
    this.get_Photo();
  }
}
