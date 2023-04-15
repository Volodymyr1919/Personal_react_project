import { makeAutoObservable } from "mobx";

export default class ConfigStore {
    // _url = "https://0318-2001-a61-2a87-5f01-42ec-7c5e-852f-dee9.ngrok-free.app";
    _url = "http://localhost:3001";
    isShow = false;
    isInfoAlertShow = false;
    textAlert = "";
    severity = "";
    err = "";

    constructor(MainStore) {
        this.MainStore = MainStore;
        makeAutoObservable(this);
    };

    setIsShow(show) {
        this.isShow = show;
    };

    setIsInfoAlertShow(infoAlert) {
        this.isInfoAlertShow = infoAlert;
    };

    setTextAlert(textAlert) {
        this.textAlert = textAlert;
    };

    setSeverity(sev) {
        this.severity = sev;
    }

    setErr(err) {
        this.err = err;
    };
}