export default class Notify {

    private _kind: String;
    private _message: String;
    private _show: Boolean;

    constructor(kind: String="", message: String="", show: Boolean=false) {
        this._kind = kind;
        this._message = message;
        this._show = show;
    }

    get kind(): String
    {
        return this._kind;
    }

    set kind(kind: String)
    {
        this._kind = kind;
    }

    get message(): String
    {
        return this._message;
    }

    set message(message)
    {
        this._message = message;
    }

    get show(): Boolean
    {
        return this._show
    }

    set show(show: Boolean)
    {
        this._show = show;
    }
}