import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DownloaderService {
  url: String;
  apiDownload: String;

  constructor(private httpCli: HttpClient) {
    this.url = environment.STREAMING_SERVICE_URL;
    this.apiDownload = '/api/download'
  }


  /**
* @description Start streaming the video from Streaming Service and download it when finish.
* @param {String} id The Video Id.
* @param {String} itag The Video Itag.
*/
  download(id: String, itag: String) {
    return this.httpCli.get(`${this.url}${this.apiDownload}/${id}/${itag}`
      , {
        responseType: 'blob', observe: 'response'
      }
    )
  }
}
