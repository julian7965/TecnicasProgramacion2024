import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ConsultarDiaFestivoComponent } from './components/consultar-dia-festivo/consultar-dia-festivo.component';
import { FestivosPorAnioComponent } from './components/festivos-por-anio/festivos-por-anio.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTabsModule,
    ConsultarDiaFestivoComponent,
    FestivosPorAnioComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'api-festivos-front';
}
