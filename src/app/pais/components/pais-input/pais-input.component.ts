import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { InputSearch } from '../../interfaces/input';
import { debounceTime, Observable, Subject } from 'rxjs';
import { Country } from '../../interfaces/nameCountry';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
export class PaisInputComponent implements OnInit {
  constructor() {}
  termino: string = '';
  @Input() title: string = '';
  @Output() term = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();

  debouncer:Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300),
    )
    .subscribe(valor=>{
      console.log('debouncer:',valor)
      this.onDebounce.emit(valor);
    })
  }

  handleSubmit() {
    if (this.termino.trim().length > 0) {
      this.term.emit(this.termino);
    } else {
      alert('Ingrese un pais');
    }
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

}
