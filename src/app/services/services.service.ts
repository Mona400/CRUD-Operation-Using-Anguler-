import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http:HttpClient) { }
  //create by post
  poststudent(data:any){
    return this._http.post<any>("http://localhost:3000/students",data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  //get
  getstudent(){
   return this._http.get<any>("http://localhost:3000/students")
   .pipe(map((res:any)=>{
    return res;

   }))
  }

  //update
  updatestudent(data:any,id:number){
    return this._http.put("http://localhost:3000/students/"+id,data)
    .pipe(map((res:any)=>{
      return res;

    }))
  }

  //delete
  deletestudent(id:number){
    return this._http.delete<any>("http://localhost:3000/students/"+id)
    .pipe(map((res:any)=>{
return res;
    }))

  }
}
