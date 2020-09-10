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

/**
Sinon
export const CONFIGS = { le json }
Puis dans le ts
private email = ...CONFIGS.EMAIL;
*/