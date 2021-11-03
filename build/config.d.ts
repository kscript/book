interface scriptOption {
    name: string;
    title: string;
    path: string;
    desc: string;
    required: boolean;
    optional: boolean;
    enable: boolean;
}
interface styleOption extends scriptOption {

}
interface Config {
    indexPath: string;
    docsPath: string;
    baseUrl: string;
    docsExt: string;
    scripts: scriptOption[];
    styles: styleOption[];
}
interface buildConfig {
    config: Config
}