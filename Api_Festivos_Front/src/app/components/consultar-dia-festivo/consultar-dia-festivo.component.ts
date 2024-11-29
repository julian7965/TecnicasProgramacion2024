import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FestivosService } from '../../services/api-festivos.service';

@Component({
  selector: 'app-consultar-dia-festivo',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [FestivosService],
  templateUrl: './consultar-dia-festivo.component.html',
  styleUrl: './consultar-dia-festivo.component.css',
})
export class ConsultarDiaFestivoComponent {
  public fecha: string = '';

  public constructor(private festivosService: FestivosService) {}

  public handleDateChange($event: MatDatepickerInputEvent<any, any>) {
    this.fecha = $event.value.toISOString().split('T')[0];
  }

  public consultarPorFecha() {
    if (this.fecha === '') {
      // this.toastService.error('Debe ingresar una fecha', 'Error');
      Swal.fire({
        title: 'Error!',
        text: 'Debe ingresar una fecha',
        icon: 'error',
      });
      return;
    }
    this.festivosService
      .consultarSiDiaEsFestivo(this.fecha)
      .subscribe((response) => {
        Swal.fire({
          title: 'Exito!',
          text: `El dia ${this.fecha} ${
            response.esFestivo ? 'SI' : 'NO'
          } festivo`,
          icon: 'success',
        });
      });
  }
}
