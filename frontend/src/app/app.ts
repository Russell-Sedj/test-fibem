import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    afterNextRender(() => {
      import('aos').then(({ default: AOS }) => {
        AOS.init({
          duration: 700,
          once: true,
          easing: 'ease-out-cubic',
          offset: 80,
        });
      });
    });
  }
}
