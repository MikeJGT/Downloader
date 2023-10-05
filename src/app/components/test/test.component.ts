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
    //this.url = 'http://localhost:3000/api/download/LXb3EKWsInQ'
    this.time = [];
    this.i = 0;
  }
  async ngOnInit() {
    //const dw = await this.testSV.download();

    //console.log('Download', dw)
    // this.download();
    //this.url = sv[0].url
    //saveAs(this.url)


    //liveBroadcastContent: "none"
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
    //this.videoTime(this.busqueda);

    //replace(/[PT]/g,'')
  }

  //https://www.youtube.com/embed/${id}


  async goToVideo(id: any) {
    localStorage.setItem('video_id', id);
    this.router.navigate([`/video`]);
  }


  //seleccionar calidad
  async download(id: any) {


    const info = await this.infoSV.audioVideo(id);
    const sv = await this.infoSV.information(id);
    const videoInfo = await this.infoSV.video(id);

    console.log('Info', sv);
    console.log('AudioVideo', info);
    console.log('VideoInfo', videoInfo);


    //console.log('Audio', info[0][0].itag);
    //console.log('Video', info[1][0].itag);

    this.downloadSV.download(id, info[1][0].itag).subscribe((blob) => {
      console.log(blob)
      //saveAs(blob, `${id}.mp4`);
    })

    // for (let tag of info) {
    //   console.log(`Calidad: ${tag.qualityLabel},Codecs: ${tag.codecs},ITAG: ${tag.itag}`)
    // }

    //console.log('Servicio', sv);

    // console.log('AudioVideo', info);

  }
}
