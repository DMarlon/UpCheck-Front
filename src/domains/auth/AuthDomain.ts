import http from "@/plugins/axiosTeste.ts"
import UserModel from "@/models/system/UserModel.ts"
import ResponseModel from "@/models/ResponseModel.ts"
import { AxiosResponse, AxiosError } from 'axios';

export default class AuthDomain {

    public login(user: string, password: string): any
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.login.validation.method,
                url: http.routes.login.validation.path(),
                headers: {"Authorization": "Basic " + btoa(user + ":" + password)}
            })
            .then((response: AxiosResponse) => {
                let user:UserModel = new UserModel();
                if (response && response.data && response.data.user) {
                    user.name = response.data.user.name;
                    user.email = response.data.user.email;
                    user.token = response.data.user.token;
                    user.status = response.data.user.status;
                }

                return resolve(user);
            })
            .catch((error: AxiosError) => {
                let customError = new ResponseModel(500, "error", "Contate o administrador!");
                if (error.response)
                    customError = customError.standardResponse(error.response);

                return reject(customError);
            })
        )
    }

    public register(user: Object)
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.account.create.method,
                url: http.routes.account.create.path(),
                data: {...user}
            })
            .then((response: AxiosResponse) => {
                return resolve(new ResponseModel(200, "sucess", "Usuário registrado com sucesso!").standardResponse(response));
            })
            .catch((error: AxiosError) => {
                let customError = new ResponseModel(500, "error", "Contate o administrador!");
                if (error.response)
                    customError = customError.standardResponse(error.response);

                return reject(customError);
            })
        );
    }

    public activation(token: string)
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.account.activation.method,
                url: http.routes.account.activation.path(token),
            })
            .then((response: AxiosResponse) => {
                return resolve(new ResponseModel(200, "sucess", "Usuário ativado com sucesso!").standardResponse(response));
            })
            .catch((error: AxiosError) => {
                let customError = new ResponseModel(500, "error", "Contate o administrador!");
                if (error.response)
                    customError = customError.standardResponse(error.response);

                return reject(customError);
            })
        );
    }

    public tokenValidation()
    {
        return new Promise((resolve, reject) =>
        http.ajax.request({
            method: http.routes.token.validation.method,
            url: http.routes.token.validation.path()
        })
        .then((response: AxiosResponse) => {
            return resolve(new ResponseModel(200, "sucess", "Token validado com sucesso!").standardResponse(response));
        })
        .catch((error: AxiosError) => {
            let customError = new ResponseModel(500, "error", "Contate o administrador!");
            if (error.response)
                customError = customError.standardResponse(error.response);

            return reject(customError);
        })
    );
    }
}