import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  url: String;
  info: String;
  tipo: String;
  key: String;

  constructor(private httpCli: HttpClient) {
    this.url = environment.STREAMING_SERVICE_URL;
    this.info = '/api/info';
    this.tipo = 'audio';
    this.key = environment.YOUTUBE_TOKEN;
  }


  /**
* @description Give the available formats and codecs of any video.
* @param {String} id The Video Id.
* @returns {Promise<any>} A promise with video formats details.
*/
  audioVideo(id: String): Promise<any> {
    return firstValueFrom(
      this.httpCli.get<any>(`${this.url}${this.info}/itag/${id}`)
    )
  }


  /**
* @description Give basic information of videos from YouTube API.
* @param {String} id The Video Id.
* @returns {Promise<any>} A promise with video details.
*/
  information(id: String): Promise<any> {
    return firstValueFrom(
      this.httpCli.get<any>(`${this.url}${this.info}/${id}`)
    )
  }


  /**
* @description Find videos that match the search field on YouTube.
* @param {String} value The search value.
* @returns {Promise<any>} A promise with all videos matching the search field.
*/
  search(value: String): Promise<any> {
    return firstValueFrom(
      this.httpCli.get<any>(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&maxResults=15&key=${this.key}`
      ))
  }


  /**
* @description Give the video details from YouTube API.
* @param {String} id The Video Id.
* @returns {Promise<any>} A promise with video details.
*/
  video(id: String): Promise<any> {
    return firstValueFrom(
      this.httpCli.get<any>(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${this.key}`)
    )
  }
}
