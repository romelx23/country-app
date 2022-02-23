import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { InputSearch } from '../../interfaces/input';
import { Country } from '../../interfaces/nameCountry';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    :host{
      width:100%;
    }
    `
  ]
})
export class PorPaisComponent implements OnInit {
  @Input() title: string = '';
  paises:Country[]=[]
  paisesSugeridos:Country[]=[]
  hayError:boolean=false;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    // console.log(termino);
    this.paisService.searchCountry(termino).subscribe({
      next: (data) => {
        this.hayError=false;
        console.log(data);
        this.paises=data;
        this.paisesSugeridos=[]
      },
      error: (error) => {
        this.hayError=true;
        console.log(error);
      },
    });
  }

  sugerencias(termino:string){
    console.log(termino)
    this.paisService.searchCountry(termino)
    .subscribe({
      next:(paises)=>{
        return this.paisesSugeridos=paises.splice(0,3)
      },
      error:(err)=>{
        return this.paisesSugeridos=[]
      }
    })
  }

}
