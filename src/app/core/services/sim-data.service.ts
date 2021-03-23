import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of  } from 'rxjs';
import * as data from '../../shared/data/items.json';
import { Item } from '../../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class SimDataService {

  constructor(private http:HttpClient) { }
  
  getItems() : Observable<any> {
    console.log(data);
    return of(data.items)
  }
 }


