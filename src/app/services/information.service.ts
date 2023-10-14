import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  url: String;
  id: String;
  info: String;
  downloade: String;
  tipo: String;
  key: String;
  //url.split('=')[1]
  constructor(private httpCli: HttpClient) {
    // this.url = 'https://downloader-otvt.onrender.com';
    this.url = 'https://byron-bay-tasmanian-devil-xdhf.2.ie-1.fl0.io'
    // this.url = 'http://localhost:3000';
    this.id = 'zoakilGMF0E';
    this.info = '/api/info';
    this.downloade = '/api/download';
    this.tipo = 'audio';
    this.key = 'AIzaSyD0WVMzlUzHV_7pRvCbjYCM0I6qttwGVYc';
  }

  audioVideo(id: String) {
    return firstValueFrom(
      this.httpCli.get<any>(`${this.url}${this.info}/itag/${id}`)
    )
  }

  information(id: String) {
    return firstValueFrom(
      this.httpCli.get<any>(`${this.url}${this.info}/${id}`)
    )
  }
  search(value: String) {
    return firstValueFrom(
      this.httpCli.get<any>(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&maxResults=15&key=${this.key}`
      ))
  }

  video(id: String) {
    return firstValueFrom(
      this.httpCli.get<any>(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${this.key}`)
    )
  }
}
