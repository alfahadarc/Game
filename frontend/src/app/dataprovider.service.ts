import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

@Injectable()
export class DataStorage {
  public constructor(private http: HttpClientModule) {}
  public data: any;
}
