import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {
  @Input() video: any;
  constructor(private router: Router) {
  }

  /**
* @description Set the video id in local storage and go to the video Page.
* @param {any} id The video Id.
* @returns {Promise<void>} An empty promise.
*/
  async goToVideo(id: any): Promise<void> {
    localStorage.setItem('video_id', id);
    this.router.navigate([`/video`]);
  }
}
