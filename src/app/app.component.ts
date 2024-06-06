import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Seguros', url: '/seguro-list', icon: 'shield' },
  ];
  public labels = [];
  constructor() {}
}
