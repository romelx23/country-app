import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Country } from '../interfaces/nameCountry';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private base=environment.base;
  private pathCountries=this.base+"/name";
  private pathCapital=this.base+"/capital";
  private pathRegion=this.base+"/region";
  private pathCode=this.base+"/alpha";

  constructor(private http:HttpClient) { }
  get httpParams(){
    return new HttpParams()
    .set('fields','flags,capital,name,population,region,cca2');
  }

  searchCountry(term:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.pathCountries}/${term}`,{params:this.httpParams});
  }
  searchCapital(term:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.pathCapital}/${term}`,{params:this.httpParams});
  }
  searchRegiion(term:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.pathRegion}/${term}`,{params:this.httpParams});
  }
  // list of code endpoint
  getCountrybyCode(code:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.pathCode}/${code}`);
  }
}
