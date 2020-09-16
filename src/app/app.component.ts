import { Component, OnInit, Inject } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';
import { AuthService } from './auth/auth.service';
import { DOCUMENT } from '@angular/platform-browser';
import { AppConfig } from './models/appConfig';
import { Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: Role[];
  private authority: string;
  appConfig: AppConfig = new AppConfig();
  lang: string = '';

  constructor(private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    private config: ConfigService,
    private auth: AuthService,
    // tslint:disable-next-line: deprecation
    @Inject(DOCUMENT) private document) { }

    async ngOnInit() {
    this.config.get();
    this.appConfig = await this.config.retrieve();
    this.setStyle(this.appConfig.theme);
    this.lang = this.appConfig.lang;
    if(this.lang == '' || this.lang == null || this.lang == undefined){
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    } else {
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
    // if (this.tokenStorage.getToken()) {
    //  this.auth.getCurrentUser();
    //   this.roles = await this.tokenStorage.getUser().roles;
    //   this.roles.every(role => {
    //     if (role.name === 'ROLE_ADMIN') {
    //       this.authority = 'admin';
    //       return false;
    //     }
    //     return true;
    //   });
    // }
  }

  setStyle(style: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const styleName = 'assets/css/app-style-' + style + '.css';
    const styleBar = 'assets/css/sidebar-menu-' + style + '.css';
    const themeLink = this.document.getElementById('theme') as HTMLLinkElement;
    const barLink = this.document.getElementById('bar') as HTMLLinkElement;
    const link1 = document.createElement('link');
    link1.setAttribute('rel', 'stylesheet');
    link1.setAttribute('type', 'text/css');
    link1.setAttribute('id', 'theme');
    link1.setAttribute('href', styleName);
    const link2 = document.createElement('link');
    link2.setAttribute('rel', 'stylesheet');
    link2.setAttribute('type', 'text/css');
    link2.setAttribute('id', 'bar');
    link2.setAttribute('href', styleBar);
    document.head.appendChild(link1);
    document.head.appendChild(link2);
    setTimeout(() => {
      themeLink.remove();
      barLink.remove();
    }, 2000);
  }
}
