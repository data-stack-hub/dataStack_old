import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url:any, params:any={}){
    console.log(url, params)
    let options = {
      params:params
    }
    return this.http.get(url, options)
  }

  post(url, data){
    console.log(url, data)
    // return fetch(url).then(res=>res.json())
    return this.http.post(url, data
    )
  }
}
