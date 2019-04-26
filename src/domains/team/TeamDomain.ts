import http from "@/plugins/axiosTeste.ts"
import { userKey } from '@/constants.ts';
import TeamModel from "@/models/team/TeamModel.ts"
import QueryOptions from "@/models/QueryOptions.ts"
import ResponseModel from "@/models/ResponseModel.ts"

export default class TeamDomain {

    public create(name: String): any
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.team.create.method,
                url: http.routes.team.create.path(),
                data: {name: name}
            })
            .then((response: any) => {
                let sucess:ResponseModel = new ResponseModel(200, "sucess", "Time criado com sucesso!")
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

    public edit(team: TeamModel): any
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.team.edit.method,
                url: http.routes.team.edit.path(team.hash),
                data: team.toDTO()
            })
            .then(response => {
                let sucess:ResponseModel = new ResponseModel(200, "success", "Time editado com sucesso!")
                if (response && response.data) {
                    sucess.code = response.status;
                    sucess.status = response.data.status;
                    sucess.message = response.data.message;
                }

                return resolve(sucess);
            })
            .catch(error => {
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

    public delete(hash: String): any
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.team.delete.method,
                url: http.routes.team.delete.path(hash),
            })
            .then(response => {
                let sucess:ResponseModel = new ResponseModel(200, "success", "Time deletado com sucesso!")
                if (response && response.data) {
                    sucess.code = response.status;
                    sucess.status = response.data.status;
                    sucess.message = response.data.message;
                }

                return resolve(sucess);
            })
            .catch(error => {
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

    public get(hash: String): any
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.team.search.method,
                url: http.routes.team.search.path(hash)
            })
            .then((response: any) => {
                let team = new TeamModel();
                let user = JSON.parse(localStorage.getItem(userKey) || "");

                if (response.data && response.data.data) {
                    team.name = response.data.data.name;
                    team.user.name = response.data.data.user.name;
                    team.user.email = response.data.data.user.email
                    team.hash = response.data.data.hash;
                    team.isOwner = user && user.email && user.email == response.data.data.user.email;
                    team.route = {name: 'about'};
                }

                return resolve(team);
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
        )
    }

    public search(queryOptions: QueryOptions = new QueryOptions()): any
    {
        return new Promise((resolve, reject) =>
            http.ajax.request({
                method: http.routes.team.searchMy.method,
                url: http.routes.team.searchMy.path(""),
                params: queryOptions.toAxiosParams()
            })
            .then((response: any) => {
                let myTeams: Array<TeamModel> = new Array();
                let user = JSON.parse(localStorage.getItem(userKey) || "");

                if (response.data.data && response.data.data.teams && Array.isArray(response.data.data.teams)) {
                    myTeams = response.data.data.teams.map(item => {
                                let team = new TeamModel();
                                team.name = item.name;
                                team.user.name = item.user.name;
                                team.user.email = item.user.email
                                team.hash = item.hash;
                                team.isOwner = user && user.email && user.email == item.user.email;
                                team.route = {name: 'about'};

                                return team;
                    });
                }

                return resolve(myTeams);
            })
            .catch((error: any) => {
                let myError:ResponseModel = new ResponseModel(500, "error", "Contate o administrador!")
                if (error && error.response && error.response.data) {
                    myError.code = error.response.status;
                    myError.status = error.response.data.status;
                    myError.message = error.response.data.message;
                }

                return reject(error);
            })
        )
    }
}