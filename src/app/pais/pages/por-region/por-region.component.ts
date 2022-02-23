import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../interfaces/nameCountry';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class PorRegionComponent implements OnInit {
  @Input() title: string = '';
  // array regiones
  regiones: string[] = ['africa','americas','asia','europe','oceania'];
  regionActiva:string='';
  paises: Country[] = [];
  hayError: boolean = false;

  constructor(private paisService: PaisService) {}
  buscar(termino: string) {
    // console.log(termino);
    this.paisService.searchRegiion(termino).subscribe({
      next: (data) => {
        this.hayError = false;
        // console.log(data);
        this.paises = data;
      },
      error: (error) => {
        this.hayError = true;
        console.log(error);
      },
    });
  }

  activarRegion(region: string) {
    if(region===this.regionActiva){return;}
    this.regionActiva=region;
    this.paises=[];
    // TODO: buscar paises de la region
    this.buscar(region);
  }

  getClaseCSS(region: string) {
    return (region===this.regionActiva) ? 'bg-blue-800 border-blue-800' : 'bg-gray-900 border-white';
  }

  ngOnInit(): void {}
}
