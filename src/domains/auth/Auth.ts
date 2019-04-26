import http from "@/plugins/axiosTeste.ts"
import UserModel from "@/models/system/UserModel.ts"
import ResponseModel from "@/models/ResponseModel.ts"

export default class Auth {

    public login(user: string, password: string): any
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.login.validation.method,
                url: http.routes.login.validation.path(),
                headers: {"Authorization": "Basic " + btoa(user + ":" + password)}
            })
            .then((response: any) => {
                let user:UserModel = new UserModel();
                if (response && response.data && response.data.user) {
                    user.name = response.data.user.name;
                    user.email = response.data.user.email;
                    user.token = response.data.user.token;
                    user.status = response.data.user.status;
                }

                return resolve(user);
            })
            .catch((error: any) => {
                let myError:ResponseModel = new ResponseModel(500, "error", "Contate o administrador!")
                if (error && error.response) {
                    myError.code = error.response.status;
                    myError.status = error.response.data.status;
                    myError.message = error.response.data.message;
                }

                return reject(myError);
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
            .then((response: any) => {
                let sucess:ResponseModel = new ResponseModel(200, "success", "Registro com sucesso!")
                if (response && response.data) {
                    sucess.code = response.status;
                    sucess.status = response.data.status;
                    sucess.message = response.data.message;
                }

                return resolve(sucess);
            })
            .catch((error: any) => {
                let myError:ResponseModel = new ResponseModel(500, "error", "Contate o administrador!")
                if (error && error.response && error.response.data) {
                    myError.code = error.response.status;
                    myError.status = error.response.data.status;
                    myError.message = error.response.data.message;
                }

                return reject(myError);
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
            .then((response: any) => {
                let sucess:ResponseModel = new ResponseModel(200, "success", "Registro com sucesso!")
                if (response && response.data) {
                    sucess.code = response.status;
                    sucess.status = response.data.status;
                    sucess.message = response.data.message;
                }

                return resolve(sucess);
            })
            .catch((error: any) => {
                let myError:ResponseModel = new ResponseModel(500, "error", "Contate o administrador!")
                if (error && error.response && error.response.data) {
                    myError.code = error.response.status;
                    myError.status = error.response.data.status;
                    myError.message = error.response.data.message;
                }

                return reject(myError);
            })
        );
    }
}