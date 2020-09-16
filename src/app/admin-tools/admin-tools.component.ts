import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { ConfigService } from '../services/config.service';
import { AppConfig } from '../models/appConfig';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {

  langs = [];
  dropdownSettings = {};
  selectedLang = [];
  themes = [];
  themesSettings = {};
  selectedTheme = [];
  title = 'menu.adminTools';
  btn = 'buttons.edit';
  form: FormGroup;
  currentLang = '';
  appConfig: AppConfig = new AppConfig();;

  constructor(private translate: TranslateService,
    private config: ConfigService,
    private fb: FormBuilder,
    // tslint:disable-next-line: deprecation
    @Inject(DOCUMENT) private document) { }

  ngOnInit() {
    this.appConfig = this.config.retrieve();
    this.langs = [
      {'id': 'en' , 'itemName': 'English' , 'icon': 'flag-icon flag-icon-gb'},
      {'id': 'fr' , 'itemName': 'Francais' , 'icon': 'flag-icon flag-icon-fr'}
    ];
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Language',
      enableSearchFilter: true
    };
    this.themes = [
      {'id': '0' , 'itemName': 'Light blue'},
      {'id': '1' , 'itemName': 'Grey'},
      {'id': '2' , 'itemName': 'Dark'}
    ];
    this.themesSettings = {
      singleSelection: true,
      text: 'Select Theme',
      enableSearchFilter: true
    };
    this.getLangName();
    this.getCurrentTheme();
    this.formBuilder();
  }

  changeStyle(style: string) {
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

  changeLang(lang: string){
    this.currentLang = lang;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  formBuilder(){
    this.form = this.fb.group({
      language: [null, Validators.compose([Validators.required])],
      theme: [null, Validators.compose([Validators.required])]
    });
  }

  getLangName(){
    const lang = this.translate.currentLang;
    if(lang === 'fr'){
      this.selectedLang.push({id: 'fr', itemName: 'Francais', icon: 'flag-icon flag-icon-fr'})
    } else if(lang === 'en'){
      this.selectedLang.push({id: 'en', itemName: 'English', icon: 'flag-icon flag-icon-gb'})
    }
  }

  getCurrentTheme(){
    const themeLink = this.document.getElementById('theme') as HTMLLinkElement;
    const theme = themeLink.href;
    const currentTheme = this.themes.filter(x => x.id === this.appConfig.theme);
    this.selectedTheme.push(currentTheme[0]);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.changeLang(this.form.value.language[0].id);
    this.changeStyle(this.form.value.theme[0].id);
    const config = new AppConfig(this.form.value.language[0].id,this.form.value.theme[0].id);
    this.config.update(config);
  }

}
