import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
} from "@angular/material";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";

const Materials = [
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
];

@NgModule({
  declarations: [],
  imports: [Materials],
  exports: [Materials],
})
export class MaterialModule {}
