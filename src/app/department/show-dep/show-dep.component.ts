import { Component ,OnInit,ElementRef, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import { SharedService } from 'src/app/shared.service'
// import { Router } from '@angular/router';
// import { BsModalService,BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';




@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent {
  constructor(private service: SharedService,private el: ElementRef, private renderer: Renderer2){} 
  // ,private modalService: BsModalService
  
  DepartmentList: any=[];
  modalTitle:any;
  dep:any;
  ActivateAddEditDepComp:boolean=false;
  // modalRef?: BsModalRef;
  // @ViewChild('template')
  // public template!: ModalDirective;


  ngOnInit():void{
    this.refreshDepList();
    // this.closeModalBodyAfterDelay();
  }

  // closeModalBodyAfterDelay() {
  //   const exampleModal = this.el.nativeElement.querySelector ('#exampleModal') ;
  //   setTimeout(() => {
  //     this.renderer.setStyle(exampleModal, 'display', 'none'); 
  //   }, 12000);
  // }
  
  addClick(){
    this.dep={
      DepartmentID:0,
      DepartmentNAME:""
    }
    this.modalTitle="Add Department";
    this.ActivateAddEditDepComp=true;
    // this.closeModalBodyAfterDelay()
    this.refreshDepList();  
  }

  CloseClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }

  editClick(item:any){
    this.dep=item;
    this.modalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
    // this.setTimer();
    // this.closeModalBodyAfterDelay()
    this.refreshDepList();
  }

  deleteClick(item:any){
    if(confirm('Are you sure..?')){
      this.service.deleteDepartment(item.DepartmentID).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
        // this.setTimer();
      });
    }
  }

  refreshDepList(){
    this.service.getDepartmentList().subscribe(data=>{
      this.DepartmentList=data;
    });
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  // closeModal(){
  //   this.template.hide();
  // }
}
