import { Injectable } from '@angular/core';
import { app } from './app'
@Injectable({
  providedIn: 'root'
})
export class AppinitService {

  constructor() {
    console.log(app)
   }
}
