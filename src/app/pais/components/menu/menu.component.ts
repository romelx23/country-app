import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputSearch } from '../../interfaces/input';
import { Country } from '../../interfaces/nameCountry';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() termCountry = new EventEmitter<string>();
  @Output() newtermCountry = new EventEmitter<string>();
  @Input() hayError:boolean=false;
  @Input() title:string=""
  @Input() paises:Country[]=[]
  @Input() paisesSugeridos:Country[]=[]
  term_Country: string = '';
  termino_sugerido:string='';

  handleTerm(e: string) {
    this.termCountry.emit(e);
    this.term_Country = e;
  }

  sugerencias(termino: string) {
    this.hayError=false;
    
    console.log(termino)
    this.termino_sugerido=termino;
    this.newtermCountry.emit(termino)
  }

  ngOnInit(): void {}
}
