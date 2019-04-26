export default class Notify {

    private _type: String;
    private _message: String;
    private _show: Boolean;

    constructor(type: String="", message: String="", show: Boolean=false) {
        this._type = name;
        this._message = message;
        this._show = show;
    }

    get type(): String
    {
        return this._type;
    }

    set type(type: String)
    {
        this._type = type;
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