<script>
    import { auth } from "../../firebase";
    import { isLog, user as userLog } from "../../stores";
    import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import Button from "./Button.svelte";

    export let data = null
    $userLog = data
    $isLog = Object.keys($userLog).length !== 0

    let handleClick = (e) => {
        e.preventDefault();
        onAuthStateChanged(auth, async authUser => {
            if(authUser){
                await signOut(auth)
            }
        })
        $isLog = false
        $userLog = {}
        fetch("/server", {method: "DELETE"})
        .then((e) => {
            console.log(e.status === 201)
        })
        goto("/profile");
    };

    const loginGoogle = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            let inote_user = {
                inote_email: user.email,
                inote_full_name: user.displayName,
                inote_user_name: "Sin asignar",
                inote_id: user.uid,
            };
            $isLog = true;
            $userLog = inote_user;
            const resFetch = await fetch("/server", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(inote_user),
                    });
            if(resFetch.status === 201){
                goto("/")
            }
        } catch (error) {
            console.error(error);
        }
    };
</script>

<div class="grid grid-cols-1 rounded-2xl p-2 mt-10 justify-center w-96">
    <h1
        class="mt-1 ml-4 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-700 md:text-4xl"
    >
        Profile
    </h1>
    <div class="block bg-gray-500 rounded-3xl p-2 m-3">
        {#if $isLog}
            <Button
                on:click={handleClick}
                styles="absolute top-3  right-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                text="LOGOUT"
            />
            <div class="flex text-gray-300 w-80 m-3">
                <h4 class="font-bold w-1/3">ID:</h4>
                <p class="">{$userLog.inote_id}</p>
            </div>
            {#if $userLog}
                <div class="flex text-gray-300 w-80 m-3">
                    <p class="font-bold w-1/3">Name:</p>
                    <p class="mr-1">{$userLog.inote_full_name}</p>
                </div>
                <div class="flex text-gray-300 w-80 m-3">
                    <p class="font-bold w-1/3">User name:</p>
                    <p>{$userLog.inote_user_name}</p>
                </div>
                <div class="flex text-gray-300 w-80 m-3">
                    <p class="font-bold w-1/3">Email:</p>
                    <p>{$userLog.inote_email}</p>
                </div>
            {:else}
                <p class=" text-gray-300 w-52 m-3">Cargando datos...</p>
            {/if}
        {:else}
            <div>
                <h3 class="text-gray-300">
                    Login now or create a new profile to use <p
                        class="font-bold text-white"
                    >
                        iNote.
                    </p>
                </h3>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full mt-5">
                <Button redirect="/login" text="LOGIN" />
                <Button redirect="/register" text="REGISTER" />
                <Button redirect="/#" text="GOOGLE" on:click={loginGoogle} />
            </div>
        {/if}
    </div>
</div>
