import { Component ,OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent {

  constructor(private service:SharedService){}

  @Input() dep:any;
  DepartmentID:any;
  DepartmentNAME:any;

  ngOnInit(): void{
    this.DepartmentID=this.dep.DepartmentID;
    this.DepartmentNAME=this.dep.DepartmentNAME;
  }

  

  addDepartment(){
    var val = { DepartmentID:this.DepartmentID,DepartmentNAME:this.DepartmentNAME};
    console.log(val)
    this.service.addDepartment(val)
    .subscribe(res=>{alert("Added Successfully");
  })

  }
  updateDepartment(){
    var val = { DepartmentID:this.DepartmentID,DepartmentNAME:this.DepartmentNAME};
    console.log(val)
    this.service.updateDepartment(val)
    .subscribe(res=>{alert("Updated Successfully"); 
  })

  }
  

}
