import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";

import { DialogComponent } from "../dialog/dialog.component";

import { HttpClient } from "@angular/common/http";

import { Gamedata } from "../../gamedata.model";
import { GamedataService } from "../../gamedata.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  //Variable
  createForm: FormGroup;
  highest: Gamedata;
  point: any;
  title: String;
  isvisibleImage = true;
  selectedFile = null;

  constructor(
    private dialog: MatDialog,
    private gamedataService: GamedataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.createForm = this.formBuilder.group({
      name: "",
      score: "",
      image: "",
    });
    this.point = this.gamedataService.getdata();
    this.getHighest();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.gamedataService.postReport(result).subscribe(() => {
        //console.log(result);
      });
    });
  }

  //getHighest score for title
  getHighest() {
    this.gamedataService.getHighest().subscribe((data: Gamedata) => {
      this.highest = data;
      if (this.highest.score < this.point) {
        this.title = "This is highst Upload your photo to show";
        this.isvisibleImage = false;
      }
    });
  }
  //Form fillup data
  addGamedata(name, score) {
    this.onUpload();
    this.gamedataService.addGamedata(name, score).subscribe(() => {
      this.router.navigate(["/list"]);
    });
  }
  //Showing all data redirecting to lost
  showList() {
    this.router.navigate(["/list"]);
  }
  //replay back to gamepage
  replay() {
    this.router.navigate(["/gamepage"]);
  }
  //For photo sending
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append("Image", this.selectedFile, this.selectedFile.name);

    this.gamedataService.uploadPhoto(fd).subscribe((res) => {});
  }

  ngOnInit() {}
}
