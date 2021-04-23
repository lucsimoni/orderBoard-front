import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken('app.config');

export const CONFIGS = {
    MAX_SESSION_TIMER: 6,
    LOADING: {
        BACKGROUND: 'rgba(255,255,255, 0.5)',
        COLOR: '#0fc4b2'
    },
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    MOBILE_MAX_WIDTH: 768
}
