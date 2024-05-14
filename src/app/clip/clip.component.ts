import { Component, ElementRef, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";
import { IClip } from '../models/clips.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation:ViewEncapsulation.None,
  providers:[DatePipe]
})
export class ClipComponent implements OnInit {

  id = ''
  @ViewChild('videoPlayer',{static:true}) target?:ElementRef
  player?: Player;
  clipData?:IClip
 

  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    console.log("in here comp" )
    this.route.data.subscribe(data=>{
      console.log(data,"sadsad")
      this.clipData = data['clipData'] as IClip;
      this.player?.src({
        src:this.clipData['url'],
        type:'video/mp4'
      })
    })
    //window.location.reload()
  }

}