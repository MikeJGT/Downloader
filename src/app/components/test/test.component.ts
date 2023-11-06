import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { saveAs } from 'file-saver';
import { pipe } from 'rxjs';
import { InformationService } from 'src/app/services/information.service';
import { DownloaderService } from 'src/app/services/downloader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  url: any;
  formulario: any;
  busqueda: any;
  long: any;
  time: any;
  i: any;
  constructor(
    private infoSV: InformationService,
    private downloadSV: DownloaderService,
    private router: Router
  ) {
    this.time = [];
    this.i = 0;
  }
  async ngOnInit() {
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
    this.busqueda = ytbSearch.items.filter((item: any) => {
      return item.snippet.liveBroadcastContent !== 'live';
    })
    this.long = this.busqueda.length - 1;
  }

  async goToVideo(id: any) {
    localStorage.setItem('video_id', id);
    this.router.navigate([`/video`]);
  }


  //seleccionar calidad
  async download(id: any) {


    const info = await this.infoSV.audioVideo(id);
    const sv = await this.infoSV.information(id);
    const videoInfo = await this.infoSV.video(id);

    this.downloadSV.download(id, info[1][0].itag).subscribe((blob) => {
  
    })

  }
}
