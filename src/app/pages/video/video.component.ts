import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloaderService } from 'src/app/services/downloader.service';
import { InformationService } from 'src/app/services/information.service';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  url: string;
  safeUrl: any;
  id: string | null;
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
    this.url = `${environment.EMBED_URL}${this.id}`;
    this.safeUrl = this.sanitas.bypassSecurityTrustResourceUrl(this.url);
  }


  async ngOnInit() {
    this.audioVideo = await this.infoSV.audioVideo(this.id!);
    this.info = await this.infoSV.information(this.id!);
    this.videoInfo = await this.infoSV.video(this.id!);

    this.formulario.patchValue({
      video: '',
      audio: ''
    });
  }


  /**
* @description Start the sreaming procces and open the dialog.
* @param {any} itag The Video Itag.
* @returns {Promise<void>} An empty promise.
*/
  async download(itag: any): Promise<void> {
    let element: any = document.getElementById('dialogo')!;
    this.showFlag = true;
    element.show();
    element.addEventListener('click', () => element.close());
    this.downloadSV.download(this.id!, itag).subscribe((blob) => {
      saveAs(blob, `${this.id}.mp4`);
    })
  }


  /**
* @description Close the dialog.
* @returns {void} No value to return.
*/
  close(): void {
    this.showFlag = false;
  }


  /**
* @description Set the flag when dialog is open.
* @returns {Boolean} Return the flag.
*/
  show(): boolean {
    this.showFlag = !this.showFlag;
    return this.showFlag;
  }
}
