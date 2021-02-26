const configs = {
    emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    mobileMaxWidth: 768
}

export class AppConfig {
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