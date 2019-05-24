import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { map } from 'rxjs/operators';


@Injectable()
export class FlickrService {
  result$: Observable<string[]>;
  key = 'feabe1354922aed843af6674ae8dfec2';
  constructor(private http: HttpClient) {}

  getResult(query: string) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this
      .key}&tags=${query}&per_page=48&format=json&nojsoncallback=1`;
    return this.http
      .get(url)
      .pipe(
        map(val => {
        //  if (val. === 'ok') {
            return val['photos'] ? val['photos'].photo.map((photo: any) => {
              return {
                url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                title: photo.title,
              };
            }) : [];
         // } else {
         //   return [];
         // }
        })
      );
  }
}
