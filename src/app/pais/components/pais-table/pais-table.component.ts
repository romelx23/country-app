import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/nameCountry';

@Component({
  selector: 'app-pais-table',
  templateUrl: './pais-table.component.html',
  styles: [
  ]
})
export class PaisTableComponent implements OnInit {
  @Input() paises:Country[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
