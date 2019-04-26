import { statusOptions } from "@/constants.ts";
import UserModel from "@/models/system/UserModel.ts";

export default class TeamModel {
    private _id: Number;
    private _name: String;
    private _user: UserModel;
    private _hash: String;
    private _isOwner: Boolean;
    private _route: String;
    private _status: any;

    constructor(id: Number = 0, name: String = "", user: UserModel = new UserModel(),  hash: String = "",
        isOwner: Boolean = false, route: String = "", status: any = statusOptions[1]) {
        this._id = id;
        this._name = name;
        this._user = user;
        this._hash = hash;
        this._isOwner = isOwner;
        this._route = route;
        this._status = status;
    }

    get id(): Number
    {
        return this._id;
    }

    set id(id: Number)
    {
        this._id = id;
    }

    get name(): String
    {
        return this._name;
    }

    set name(name: String)
    {
        this._name = name;
    }

    get user(): UserModel
    {
        return this._user;
    }

    set user(user: UserModel)
    {
        this._user = user;
    }

    get hash(): String
    {
        return this._hash;
    }

    set hash(hash: String)
    {
        this._hash = hash;
    }

    get isOwner(): Boolean
    {
        return this._isOwner;
    }

    set isOwner(isOwner: Boolean)
    {
        this._isOwner = isOwner;
    }

    get route(): String
    {
        return this._route;
    }

    set route(route: String)
    {
        this._route = route;
    }

    get status(): any
    {
        return this._status;
    }

    set status(status: any)
    {
        this._status = status;
    }

    public toDTO(): Object
    {
        return {
            id: this._id,
            name: this._name,
            user: this._user,
            hash: this._hash,
            status: this._status.value
        }
    }
}