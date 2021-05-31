import { AppComponent } from "../../core/AppComponent";

export class Header extends AppComponent {
  static className = 'header'
  static tagName = 'header'
  

  toHtml() {
    return `<h1 class="header__title">Photo Filter</h1>`
  }
} 