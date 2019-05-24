import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss']
})
export class FlickrComponent implements OnInit {

  searchControl = new FormControl();
  model$: Observable<string>;
  photos: Object;

  constructor(private formBuilder: FormBuilder, private flickrService: FlickrService) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query: string) => this.flickrService.getResult(query))
      .subscribe(value => {
        this.photos = value;
      });
  }

}
