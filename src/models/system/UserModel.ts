import { statusOptions } from "@/constants.ts";

export default class UserModel {

    private _name: String;
    private _email: String;
    private _status: any;
    private _token: String;


    constructor(name: String="", email: String="", status: any=statusOptions[1], token: String="") {
        this._name = name;
        this._email = email;
        this._status = status;
        this._token = token;
    }

    get name(): String
    {
        return this._name;
    }

    set name(name: String)
    {
        this._name = name;
    }

    get email(): String
    {
        return this._email;
    }

    set email(email)
    {
        this._email = email;
    }

    get status(): any
    {
        return this._status;
    }

    set status(status)
    {
        this._status = (status == 1 || status == 2) ? statusOptions[status-1] : status;
    }

    get token(): String
    {
        return this._token
    }

    set token(token)
    {
        this._token = token;
    }

    public toDTO(): Object
    {
        return {
            name: this._name,
            email: this._email,
            status: this._status,
            token: this._token,
        }
    }
}