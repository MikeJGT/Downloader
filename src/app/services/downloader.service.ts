import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identity } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  url: String;
  id: String;
  info: String;
  downloade: String;

  constructor(private httpCli: HttpClient) {
    this.url = 'https://byron-bay-tasmanian-devil-xdhf.2.ie-1.fl0.io';
    this.id = 'zoakilGMF0E';
    this.info = '/api/info';
    this.downloade = '/api/download'
  }


  download(id: String, itag: String) {
    return this.httpCli.get(`${this.url}${this.downloade}/${id}/${itag}`
      , {
        responseType: 'blob'
      }
    )
  }
}
