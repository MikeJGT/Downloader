import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloaderService } from 'src/app/services/downloader.service';
import { InformationService } from 'src/app/services/information.service';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  url: any;
  safeUrl: any;
  id: any;
  audioVideo: any;
  info: any;
  videoInfo: any;
  formulario: FormGroup;
  showFlag: boolean;
  constructor(
    private sanitas: DomSanitizer,
    private infoSV: InformationService,
    private downloadSV: DownloaderService
  ) {
    //this.token = '';
    this.formulario = new FormGroup({
      audio: new FormControl(),
      video: new FormControl()
    });
    this.id = localStorage.getItem('video_id');
    this.audioVideo = {};
    this.info = {};
    this.videoInfo = {};
    this.showFlag = false;
  }

  async ngOnInit() {

    //setTimeout
    //this.id = localStorage.getItem('video_id');

    this.url = `https://www.youtube.com/embed/${this.id}`;

    this.safeUrl = this.sanitas.bypassSecurityTrustResourceUrl(this.url);

    this.audioVideo = await this.infoSV.audioVideo(this.id);
    this.info = await this.infoSV.information(this.id);
    this.videoInfo = await this.infoSV.video(this.id);

    //console.log('AudioVideo', this.audioVideo);
    //console.log('Video', this.audioVideo[1][0].itag);
    //console.log('Audio', this.audioVideo[0][0].itag);

    this.formulario.patchValue({
      video: 'video',
      audio: 'audio'
    });

  }


  // async ngOnInit() {
  //   this.id = localStorage.getItem('video_id') || 'NO ID YET';

  //   this.url = `https://www.youtube.com/embed/${this.id}`;

  //   this.safeUrl = this.sanitas.bypassSecurityTrustResourceUrl(this.url);

  //   this.audioVideo = JSON.parse(localStorage.getItem('audioVideo')!);
  //   this.info = JSON.parse(localStorage.getItem('info')!);
  //   this.videoInfo = JSON.parse(localStorage.getItem('videoInfo')!);

  //   // JSON.parse(localStorage.getItem('search')!);

  //   // localStorage.setItem('videoInfo', JSON.stringify(this.videoInfo));
  //   // localStorage.setItem('info', JSON.stringify(this.info));
  //   // localStorage.setItem('audioVideo', JSON.stringify(this.audioVideo));


  //   console.log('AudioVideo', this.audioVideo);
  //   console.log('Video', this.audioVideo[1][0].itag);
  //   console.log('Audio', this.audioVideo[0][0].itag);

  //   this.formulario.patchValue({
  //     video: 'video',
  //     audio: 'audio'
  //   });

  //}

  //seleccionar calidad
  async download(itag: any) {

    //console.log('Formulario', itag)


    this.downloadSV.download(this.id, itag).subscribe((blob) => {
      console.log(blob)
      saveAs(blob, `${this.id}.mp4`);
      alert('Download already start, wait a few seconds please.')
    })
  }

  show() {
    this.showFlag = !this.showFlag;
    return this.showFlag;
  }
}
