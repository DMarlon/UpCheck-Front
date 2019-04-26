const RoutesAPI = {
    login: {
        validation: {
            method: "GET",
            path: ()=>"login",
        }
    },
    account: {
        create: {
            method: "POST",
            path: ()=>"login",
        },
        activation: {
            method: "GET",
            path: (token: String)=>"login/account/activation/" + token,
        },
    },
    token: {
        validation: {
            method: "GET",
            path: ()=>"token",
        }
    },
    team: {
        search: {
            method: "GET",
            path: (hash: String)=>"teams" + (hash && hash !="" ? "/" + hash : ""),
        },
        searchMy: {
            method: "GET",
            path: (hash: String)=>"teams/my" + (hash && hash !="" ? "/" + hash : ""),
        },
        create: {
            method: "POST",
            path: ()=>"teams",
        },
        edit: {
            method: "PUT",
            path: (hash: String)=>"teams/" + hash,
        },
        delete: {
            method: "DELETE",
            path: (hash: String)=>"teams/" + hash,
        }
    },
}

export default RoutesAPI;
