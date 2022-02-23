import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country, Translation } from '../../interfaces/nameCountry';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;
  lat: number = 0;
  lng: number = 0;
  url: SafeUrl = '';
  traducciones: Translation[] = [];
  lenguas: string = "";
  // sanitizer
  sanetizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.paisService.getCountrybyCode(id);
        }),
        tap(console.log)
      )
      .subscribe((pais) => {
        this.pais = pais[0];
        this.lat = this.pais.latlng[0];
        this.lng = this.pais.latlng[1];
        this.traducciones=Object.keys(this.pais.translations).map((key) => ({
          official:this.pais.translations[key].official,
          common:this.pais.translations[key].common
        }));
        this.lenguas=Object.values(this.pais.languages).join(',');
        console.log(
          `https://maps.google.com/maps?q=${this.lat},${this.lng}&hl=es&output=embed`
        );
        this.url = this.sanetizeUrl(
          `https://maps.google.com/maps?q=${this.lat},${this.lng}&hl=es&output=embed`
        );
      });
    // this.activateRoute.paramMap
    // .subscribe((params) => {
    //   console.log(params.get('id'));
    //   const id = params.get('id');
    //   if (id !== null) {
    //     this.paisService.getCountrybyCode(id).subscribe((pais) => {
    //       console.log(pais);
    //     });
    //   }
    // });
  }
}
