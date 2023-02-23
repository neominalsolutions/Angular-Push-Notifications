import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NewsletterService {

  constructor(private http: HttpClient) { }

  // atılan pushlara subscribe ol
  addPushSubscriber(sub) {
    return this.http.post('http://localhost:9000/api/notifications', sub);
  }

  // push at
  send() {
    return this.http.post('http://localhost:9000/api/newsletter', null);
  }

}
