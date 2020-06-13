import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import { Gamedata } from "../../gamedata.model";
import { GamedataService } from "../../gamedata.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  gamedata: Gamedata[];

  displayedColumns = ["name", "score", "rank"];

  constructor(
    private gamedataService: GamedataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.gamedataService.getGamedata().subscribe((data: Gamedata[]) => {
      this.gamedata = data;
      console.log("Data Requested....");
      //console.log(this.gamedata);
    });
  }

  showHome() {
    this.router.navigate(["/home"]);
  }
  showGamepage() {
    this.router.navigate(["/gamepage"]);
  }
}
