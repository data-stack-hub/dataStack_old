import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url:any){
    return this.http.get(url)
  }

  post(url, data){
    console.log(url, data)
    return fetch(url).then(res=>res.json())
    return this.http.post(url, data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }})
  }
}
