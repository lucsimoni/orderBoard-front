const configs = {
    regex: /^[0:9]$/,
}

export class AppConfig {

    // public regex: RegExp = AppConfig.configs.timeRegex;

    public static configs;
    initialize() {
        AppConfig.configs = configs;
    }
}