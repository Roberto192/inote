import { redirect } from "@sveltejs/kit";

export const load = (data) => {
    let session = data.cookies.get("session")
    if(session !== undefined){
        return JSON.parse(session)
    }else{
        return null
    }
}