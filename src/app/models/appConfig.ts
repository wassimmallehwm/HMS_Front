export class AppConfig {
  lang: string;
  theme: string;

  constructor(
    lang?: string,
    theme?: string
    ) {
    this.lang = lang;
    this.theme = theme;
  }
}
