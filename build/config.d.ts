interface Config {
    indexPath: string;
    docsPath: string;
    baseUrl: string;
    docsExt: string;
    scripts: string[];
    styles: string[];
}
interface buildConfig {
    config: Config
}