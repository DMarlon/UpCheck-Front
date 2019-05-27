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
            path: (hash: String)=>"team" + (hash && hash !="" ? "/" + hash : ""),
        },
        create: {
            method: "POST",
            path: ()=>"team",
        },
        edit: {
            method: "PUT",
            path: (hash: String)=>"team/" + hash,
        },
        delete: {
            method: "DELETE",
            path: (hash: String)=>"team/" + hash,
        }
    },
}

export default RoutesAPI;
