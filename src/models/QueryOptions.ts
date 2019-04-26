import { statusOptions } from "@/constants.ts";

export default class QueryOptions {

    private _term: String;
    private _filter: String;
    private _status: any;
    private _position: Number;
    private _limit: Number;
    private _order: String;

    constructor() {
        this._term = "";
        this._filter = "";
        this._status = statusOptions[1].value;
        this._position = 0;
        this._limit = 0;
        this._order = "";
    }



    get term(): String
    {
        return this._term;
    }

    set term(term: String)
    {
        this._term = term;
    }

    get filter(): String
    {
        return this._filter;
    }

    set filter(filter: String)
    {
        this._filter = filter;
    }

    get status(): any
    {
        return this._status;
    }

    set status(status: any)
    {
        this._status = status;
    }

    get position(): Number
    {
        return this._position;
    }

    set position(position: Number)
    {
        this._position = position;
    }

    get limit(): Number
    {
        return this._limit;
    }

    set limit(limit: Number)
    {
        this._limit = limit;
    }

    get order(): String
    {
        return this._order;
    }

    set order(order: String)
    {
        this._order = order;
    }

    public toAxiosParams() {
        let params: any = {};
        if (this._term && this._term.trim() != "")
            params.term = this._term.trim();
        if (this._filter && this._filter.trim() != "")
            params.filter = this._filter.trim();
        if (this._status && this._status != 0)
            params.status = this._status;
        if (this._position && this._position != 0)
            params.position = this._position;
        if (this._limit && this._limit != 0)
            params.limit = this._limit;
        if (this._order && this._order != "")
            params.order = this._order;

        return params;
    }

    public toURLParams() {
        let params: any = [];
        if (this._term && this._term.trim() != "")
            params.push("term="+this._term.trim());
        if (this._filter && this._filter.trim() != "")
            params.push("filter="+this._filter.trim());
        if (this._status && this._status != 0)
            params.push("status="+this._status);
        if (this._position && this._position != 0)
            params.push("position="+this._position);
        if (this._limit && this._limit != 0)
            params.push("limit="+this._limit);
        if (this._order && this._order != "0")
            params.push("order="+this._order);

        let reduceFunction = (accumulator: String, currentValue: String | Number) => {
            return accumulator + (accumulator === "?" ? "" : "&") + currentValue;
        }

        return params.length > 0 ? params.reduce(reduceFunction, "?") : "";
    }
}