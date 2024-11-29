import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FestivosService } from '../../services/api-festivos.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-festivos-por-anio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
  ],
  providers: [FestivosService],
  templateUrl: './festivos-por-anio.component.html',
  styleUrl: './festivos-por-anio.component.css',
})
export class FestivosPorAnioComponent {
  public anioFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(4),
  ]);
  public festivos: string[] = [];

  public constructor(private festivosService: FestivosService) {}

  public consultarPorFecha() {
    if (this.anioFormControl.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Debe ingresar un año válido',
        icon: 'error',
      });
      return;
    }
    const anio = this.anioFormControl.value as string;

    this.festivosService.traerFestivosPorAnio(anio).subscribe((festivos) => {
      this.festivos = festivos;
    });
  }

  public limpiarFestivos() {
    this.festivos = [];
    this.anioFormControl.setValue('');
  }
}
