import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import{studentdata} from './student.module'
// import {api} from './services/services.service'
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  formValue!:FormGroup

  showadd!:boolean;
  showupdate!:boolean;
studentmodelobj:studentdata=new studentdata;
allstudentdata:any;

constructor(private formBuilder:FormBuilder,private api:ServicesService,private Activated:ActivatedRoute){

}


//to hide on add
  add(){
    this.showadd=true;
    this.showupdate=false

  }
  //to hide on edit
  edit(data:any){
    this.showadd=false;
    this.showupdate=true;

this.studentmodelobj.id=data.id;
    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['built_no'].setValue(data.built_no);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phone'].setValue(data.phone);

  }

  //update on edit

update(){
  this.studentmodelobj.id=this.formValue.value.id;
  this.studentmodelobj.name=this.formValue.value.name;
  this.studentmodelobj.city=this.formValue.value.city;
  this.studentmodelobj.built_no=this.formValue.value.built_no;
  this.studentmodelobj.age=this.formValue.value.age;

  this.studentmodelobj.email=this.formValue.value.email;
  this.studentmodelobj.phone=this.formValue.value.phone;

  this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
    this.formValue.reset();
    this.getdata();
alert("Record update successfully")
  },err=>{
    alert("something is wrong ")
  })
}


  addstudent(){
    this.studentmodelobj.id=this.formValue.value.id;
    this.studentmodelobj.name=this.formValue.value.name;
    this.studentmodelobj.city=this.formValue.value.city;
    this.studentmodelobj.built_no=this.formValue.value.built_no;
    this.studentmodelobj.age=this.formValue.value.age;

    this.studentmodelobj.email=this.formValue.value.email;
    this.studentmodelobj.phone=this.formValue.value.phone;

    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
      this.formValue.reset(res)
      this.getdata();
      alert("record add successfully")

    },err=>{
      alert("something went wrong ")
    })

  }

  //getdata
getdata(){
this.api.getstudent()
.subscribe(res=>{
  this.allstudentdata=res;
})
}

//delete
deletestud(data:any){
  if(confirm('are you sure to delete?'))
  this.api.deletestudent(data.id)
  .subscribe(res=>{
    alert("Recodr delete successfully");
    this.getdata();
  })

}



  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      id:['',Validators.required],
      name:['',Validators.required],
      city:['',Validators.required],
      built_no:['',Validators.required],
     age:['',Validators.required],
     email:['',Validators.required],
     phone:['',Validators.required],


    })
    this.getdata();
  }

}
