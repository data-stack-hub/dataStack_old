import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  app_vars:any
  constructor() { 
  }


  set_app_variables(_app_vars){
    this.app_vars = _app_vars
    this.app_vars.workspace = 'default'
  }
  
  replace_variable(target:string, scoped_vars? ){
    let regex = /\$(\w+)|\[\[(\w+?)(?::(\w+))?\]\]|\${(\w+)(?:\.([^:^\}]+))?(?::([^\}]+))?}/g;
    return  target.replace(regex,(match, var1, var2, fmt2, var3, fieldPath, fmt3) =>{
      const variableName = var1 || var2 || var3;
      if (!(scoped_vars == undefined) && scoped_vars.hasOwnProperty(variableName)){
        return scoped_vars[variableName]
      }else{
        return this.app_vars[variableName]
      }
    })
    
    
  }
}
