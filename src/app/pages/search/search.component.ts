import { Component } from '@angular/core';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  formulario: any;
  busqueda: Array<any>;
  long: number;
  time: Array<any>;
  i: number;
  showFlag: boolean;

  constructor(private infoSV: InformationService) {
    this.time = [];
    this.i = 0;
    this.showFlag = true;
    this.busqueda = [];
    this.long = 0;
  }


  /**
* @description Gives the video duration.
* @param {any} array The value to search.
* @returns {Promise<void>} An empty promise.
*/
  async videoTime(array: any) {
    let videoInfo = await this.infoSV.video(array[this.i].id.videoId);
    this.time.push(videoInfo.items[0].contentDetails.duration.replace(/[PT]/g, '').toLowerCase());
    if (this.i === this.long) {
      return;
    }
    setTimeout(() => {
      this.videoTime(array);
    }, 500);
    this.i++;
  }


  /**
 * @description Search a list of videos and discard channels and live streams.
 * @param {any} formulario The value to search.
 * @returns {Promise<void>} An empty promise.
 */
  async search(formulario: any): Promise<void> {
    const ytbSearch = await this.infoSV.search(formulario.value.search);
    this.busqueda = ytbSearch.items.filter((item: any) => {
      return item.snippet.liveBroadcastContent !== 'live' && item.id.kind === "youtube#video";
    })
    this.long = this.busqueda.length - 1;
  }
}
