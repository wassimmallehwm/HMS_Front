import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/services/config.service';
import { AppConfig } from 'src/app/models/appConfig';
import { AuthService } from 'src/app/auth/auth.service';
import { DOCUMENT } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  currentLang = '';
  interv: any;
  currentUser: User = new User();

  constructor(private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private config: ConfigService,
    // tslint:disable-next-line: deprecation
    @Inject(DOCUMENT) private document) { }

  ngOnInit() {

    this.interv = setInterval(() => {
      this.authService.refreshToken();
    }, 30000);
    this.currentLang = this.translate.currentLang;
    this.currentUser = this.tokenStorage.getUser();
    // === toggle-menu js
    $('.toggle-menu').on('click', function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
    $('#user-details').on('click', function(e) {
      e.preventDefault();
      $('#user-dropdown').toggleClass('show');
      $('#user-details').toggleClass('collapsed');
    });
    // === sidebar menu activation js
    $(function () {
      for (let i = window.location, o = $('.sidebar-menu a').filter(function () {
        return this.href === i;
      }).addClass('active').parent().addClass('active'); ;) {
        if (!o.is('li')) {
          break;
        }
        o = o.parent().addClass('in').parent().addClass('active');
      }
    });
  }

  public clickStockSubMenu() {
    $('#stock-dropdown').toggleClass('show');
    $('#stock').toggleClass('collapsed');
  }

  public clickProdSubMenu() {
    $('#prods-dropdown').toggleClass('show');
    $('#prods').toggleClass('collapsed');
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    clearInterval(this.interv);
  }

}
