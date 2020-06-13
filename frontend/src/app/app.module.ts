import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material/material.module";
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatDialogModule,
} from "@angular/material";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./components/home/home.component";

import { GamedataService } from "./gamedata.service";
import { ListComponent } from "./components/list/list.component";
import { GamepageComponent } from "./components/gamepage/gamepage.component";
import { DialogComponent } from "./components/dialog/dialog.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "list", component: ListComponent },
  { path: "gamepage", component: GamepageComponent },
  { path: "", redirectTo: "gamepage", pathMatch: "full" },
  { path: "**", redirectTo: "gamepage", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    GamepageComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  entryComponents: [DialogComponent],
  providers: [GamedataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
