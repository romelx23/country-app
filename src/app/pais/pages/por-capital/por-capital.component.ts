import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../interfaces/nameCountry';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class PorCapitalComponent implements OnInit {
  @Input() title: string = '';
  paises: Country[] = [];
  hayError: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    // console.log(termino);
    this.paisService.searchCapital(termino).subscribe({
      next: (data) => {
        this.hayError = false;
        console.log(data);
        this.paises = data;
      },
      error: (error) => {
        this.hayError = true;
        console.log(error);
      },
    });
  }

  ngOnInit(): void {}
}
