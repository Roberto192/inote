import { redirect } from "@sveltejs/kit";

export const load = (data) => {
    let session = data.cookies.get("session")
    if(session === undefined){
        throw redirect(307, "/profile")
    }else{
        return JSON.parse(session)
    }
}