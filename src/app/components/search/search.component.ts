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

  constructor(private infoSV: InformationService,
    private downloadSV: DownloaderService,
    private router: Router) {
    this.time = [];
    this.i = 0;
  }

  async videoTime(array: any) {
    let videoInfo = await this.infoSV.video(array[this.i].id.videoId);
    this.time.push(videoInfo.items[0].contentDetails.duration.replace(/[PT]/g, '').toLowerCase());
    console.log('VideoTime', videoInfo, this.time);
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
    //let videoInfo = await this.infoSV.video('zoakilGMF0E');
    //console.log('videos', videoInfo);

    console.log('SearchValue', ytbSearch.items);
    this.busqueda = ytbSearch.items.filter((item: any) => {
      return item.snippet.liveBroadcastContent !== 'live';
    })
    console.log('Busqueda', this.busqueda)
    this.long = this.busqueda.length - 1;
    this.videoTime(this.busqueda);

    //replace(/[PT]/g,'')
  }




  async mockSearch(formulario: any) {
    //const ytbSearch = await this.infoSV.search(formulario.value.search);
    const ytbSearch = JSON.parse(localStorage.getItem('search')!);
    console.log('LOCAL STORAGE', ytbSearch)
    let videos: any[] = [];
    //let videoInfo = await this.infoSV.video('zoakilGMF0E');
    //console.log('videos', videoInfo);

    console.log('SearchValue', ytbSearch.items);
    this.busqueda = ytbSearch.filter((item: any) => {
      return item.snippet.liveBroadcastContent !== 'live';
    })
    // localStorage.setItem('search', JSON.stringify(this.busqueda));
    console.log('Busqueda', this.busqueda)
    this.long = this.busqueda.length - 1;
    // this.videoTime(this.busqueda);

    //replace(/[PT]/g,'')
  }


  async goToVideo(id: any) {
    localStorage.setItem('video_id', id);

    //testing
    this.router.navigate([`/video`]);
  }
}
