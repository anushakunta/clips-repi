import { Component, Input, OnDestroy, OnInit,OnChanges,Output,EventEmitter } from '@angular/core';
import { IClip } from 'src/app/models/clips.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy{
  @Input() activeClip:IClip |null = null;
  @Output() update = new EventEmitter()

  clipId = new FormControl('',{nonNullable:true});
  title = new FormControl('',{validators:[Validators.required,Validators.minLength(3)],nonNullable:true})
  editForm = new FormGroup({
    title :this.title,
    id:this.clipId
  })
  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait updating clip'


  constructor(private modalService:ModalService,
    private clipService:ClipService
  ){}

  ngOnDestroy() {
    this.modalService.unregister('editClip');
  }

  ngOnInit(): void {
    this.modalService.register('editClip');
  }

  ngOnChanges() {
    if(!this.activeClip){
      return
    }
    this.inSubmission = false;
    this.showAlert = false;
    this.clipId.setValue(this.activeClip?.docID as string)
    this.title.setValue(this.activeClip?.title)
  }

  async submit(){
    if(!this.activeClip) {
      return
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg='Please wait! updating clip';

   try{
    await this.clipService.updateClip(
      this.clipId.value,this.title.value
    )
   }catch(err){
    this.inSubmission = false;
    this.alertColor = 'red';
    this.alertMsg = 'Something went wrong.Try again.'
    return
   }
   this.activeClip.title = this.title.value;
   this.update.emit(this.activeClip);

   this.inSubmission = false;
   this.alertColor = 'green';
   this.alertMsg = 'Success!'
  }

}