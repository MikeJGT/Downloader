import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  url: String;
  id: String;
  info: String;
  downloade: String;
  tipo: String;
  //url.split('=')[1]
  constructor(private httpCli: HttpClient) {
    this.url = 'http://localhost:3000';
    this.id = 'zoakilGMF0E';
    this.info = '/api/info';
    this.tipo = 'video';
    this.downloade = '/api/download'
  }

  test() {
    return firstValueFrom(
      this.httpCli.get<any>(`${this.url}${this.info}/${this.tipo}/${this.id}`)
    )
  }
  download() {
    // return firstValueFrom(
    //   this.httpCli.get<any>(`${this.url}${this.downloade}/${this.id}`)
    // )
    return this.httpCli.get(`${this.url}${this.downloade}/${this.id}`
      , {
        responseType: 'blob'
      }
    )
  }
}
