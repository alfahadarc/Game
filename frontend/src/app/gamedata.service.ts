import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GamedataService {
  uri = "/";
  data: any;

  constructor(private http: HttpClient) {}

  getGamedata() {
    return this.http.get(`${this.uri}/gamedatas`);
  }

  getHighest() {
    return this.http.get(`${this.uri}/highest`);
  }

  addGamedata(name, score) {
    const gamedata = {
      name: name,
      score: score,
    };
    return this.http.post(`${this.uri}/gamedata/add`, gamedata);
  }

  uploadPhoto(photo) {
    return this.http.post(`${this.uri}/addphoto`, photo);
  }

  getPhoto() {
    return this.http.get(`${this.uri}/getphoto`);
  }

  postReport(result) {
    const report = {
      report: result,
    };
    return this.http.post(`${this.uri}/report`, report);
  }

  storage(data) {
    this.data = data;
    return 1;
  }

  getdata() {
    return this.data;
  }
}
