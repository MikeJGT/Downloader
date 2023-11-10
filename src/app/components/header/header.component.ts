import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  prevScrollpos: any;
  constructor(public router: Router) {
    this.prevScrollpos = window.scrollY;
  }




  /**
* Description: Hide header on scroll down, show on scroll up.
*/
  @HostListener("window:scroll", []) onWindowScroll() {
    var currentScrollPos = window.scrollY;
    if (this.prevScrollpos > currentScrollPos) {
      document.getElementById("wrapper")!.style.top = "0";
    } else {
      document.getElementById("wrapper")!.style.top = "-80px";
    }
    this.prevScrollpos = currentScrollPos;
  }
}
