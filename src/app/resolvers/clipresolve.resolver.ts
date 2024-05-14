import { Injectable, inject } from '@angular/core';
import {
  Router, ResolveFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { IClip } from '../models/clips.model';
import { ClipService } from '../services/clip.service';

export const ClipresolveResolver: ResolveFn<IClip| null> = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,router:Router = inject(Router)): 
  Observable<IClip | null> => {
  const clipsService = inject(ClipService);

  return clipsService.clipsCollection.doc(route.params['id'])
            .get()
            .pipe(
              map(snapshot =>{
                const data = snapshot.data();
                console.log(data)
                if(!data){
                  router.navigate(['/'])
                  return null;
                }
                return data;
              })
            )

}
