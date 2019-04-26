import { AxiosResponse } from 'axios';

export default class ResponseModel {
    private _code: Number;
    private _status: String;
    private _message: String;

    constructor(code: Number=0, status: String="", message: String="") {
        this._code = code;
        this._status = status;
        this._message = message;
    }

    get code(): Number
    {
        return this._code;
    }

    set code(code)
    {
        this._code = code;
    }

    get status(): String
    {
        return this._status;
    }

    set status(status)
    {
        this._status = status;
    }

    get message(): String
    {
        return this._message;
    }

    set message(message)
    {
        this._message = message;
    }

    public standardResponse(response: AxiosResponse): ResponseModel
    {
        if (response.data) {
            this._code = response.status;
            this._status = response.data.status;
            this._message = response.data.message;
        }

        return this;
    }

}