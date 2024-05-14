import { Component,Input,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control : FormControl = new FormControl()
  @Input() type : string = '';
  @Input() placeholder:string = '';
  @Input() format = '';

  constructor(){

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');

  }
  ngOnChanges(){
    console.log(this.control.errors?.['noMatch'])
    console.log(this.control.errors?.['emailTaken'])
  }

}