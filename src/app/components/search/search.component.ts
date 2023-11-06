import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DownloaderService } from 'src/app/services/downloader.service';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  formulario: any;
  busqueda: any;
  long: any;
  time: any;
  i: any;
  showFlag: boolean;

  constructor(private infoSV: InformationService,
    private downloadSV: DownloaderService,
    private router: Router) {
    this.time = [];
    this.i = 0;
    this.showFlag = true;
  }

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



  async search(formulario: any) {
    const ytbSearch = await this.infoSV.search(formulario.value.search);
    let videos: any[] = [];
    console.log('SearchValue', ytbSearch.items);
    this.busqueda = ytbSearch.items.filter((item: any) => {
      return item.snippet.liveBroadcastContent !== 'live' && item.id.kind === "youtube#video";
    })
    this.long = this.busqueda.length - 1;

  }


  async goToVideo(id: any) {
    localStorage.setItem('video_id', id);
    this.router.navigate([`/video`]);
  }
}
