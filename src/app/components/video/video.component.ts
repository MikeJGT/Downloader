import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloaderService } from 'src/app/services/downloader.service';
import { InformationService } from 'src/app/services/information.service';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    this.formulario = new FormGroup({
      audio: new FormControl('', [Validators.required]),
      video: new FormControl('', [Validators.required])
    });
    this.id = localStorage.getItem('video_id');
    this.audioVideo = {};
    this.info = {};
    this.videoInfo = {};
    this.showFlag = false;
  }

  async ngOnInit() {
    this.url = `https://www.youtube.com/embed/${this.id}`;

    this.safeUrl = this.sanitas.bypassSecurityTrustResourceUrl(this.url);

    this.audioVideo = await this.infoSV.audioVideo(this.id);
    this.info = await this.infoSV.information(this.id);
    this.videoInfo = await this.infoSV.video(this.id);

    this.formulario.patchValue({
      video: '',
      audio: ''
    });
  }

  close() {
    this.showFlag = false;
  }

  //seleccionar calidad
  async download(itag: any) {

    let element: any = document.getElementById('dialogo')!;
    this.showFlag = true;
    element.show();
    element.addEventListener('click', () => element.close());

    this.downloadSV.download(this.id, itag).subscribe((blob) => {
      saveAs(blob, `${this.id}.mp4`);
    })
  }

  show() {
    this.showFlag = !this.showFlag;
    return this.showFlag;
  }
}
