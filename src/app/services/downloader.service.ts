import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  url: String;
  id: String;
  info: String;
  downloade: String;

  constructor(private httpCli: HttpClient) {
    this.url = 'http://localhost:3000';
    this.id = 'zoakilGMF0E';
    this.info = '/api/info';

    this.downloade = '/api/download'
  }


  download(id: String, itag: String) {
    // return firstValueFrom(
    //   this.httpCli.get<any>(`${this.url}${this.downloade}/${this.id}`)
    // )
    return this.httpCli.get(`${this.url}${this.downloade}/${id}/${itag}`
      , {
        responseType: 'blob'
      }
    )
  }
}