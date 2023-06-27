<script>
    import { userCollection } from "../../firebase";
    import { isLog, user as userLog } from "../../stores";
    import { addDoc } from "firebase/firestore";
    import { goto } from "$app/navigation";

    if($isLog){
        goto("/profile")
    }

    let inote_full_name = "";
    let inote_user_name = "";
    let inote_email = "";
    let inote_password = "";
    let inote_repeat_password = "";

    let matchPasError = false;

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (inote_password !== inote_repeat_password) {
            matchPasError = true;
        } else {
            matchPasError = false;
            let user = {
                inote_full_name,
                inote_user_name,
                inote_email,
                inote_password,
            };

            try {
                //await db.colletion(usersCollection).doc.set(user)
                const docRef = await addDoc(userCollection, user);
                console.log("Usuario agregado exitosamente");
                $isLog = true;
                $userLog = {
                    inote_full_name,
                    inote_email,
                    inote_user_name,
                    inote_id: docRef.id,
                };
                goto("/");
            } catch (error) {
                console.error(error);
            }
        }
    };
</script>

<form on:submit={handleSubmit}>
    <div class="grid md:grid-cols-1 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input
                type="text"
                name="inote_full_name"
                id="inote_full_name"
                bind:value={inote_full_name}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-950 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="inote_full_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Full name</label
            >
        </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input
                type="text"
                name="inote_user_name"
                id="inote_user_name"
                bind:value={inote_user_name}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-950 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="inote_user_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >User name</label
            >
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input
                type="email"
                name="inote_email"
                id="inote_email"
                bind:value={inote_email}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-950 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="inote_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Email address</label
            >
        </div>
    </div>
    {#if matchPasError}
        <p class="text-red-700 my-4">both passwords must match</p>
    {/if}
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input
                type="password"
                name="inote_password"
                id="inote_password"
                bind:value={inote_password}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-950 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="inote_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Password</label
            >
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input
                type="password"
                name="inote_repeat_password"
                id="inote_repeat_password"
                bind:value={inote_repeat_password}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-950 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="inote_repeat_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Confirm password</label
            >
        </div>
    </div>

    <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button
    >
</form>
