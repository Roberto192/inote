<script>
    import { userCollection } from "../../firebase";
    import { getDocs, query, where } from "firebase/firestore";
    import { isLog, user } from "../../stores";
    import { goto } from "$app/navigation";

    let inote_email, inote_password;
    let matchPasError = false;

    async function validarUsuario(correo, contraseña) {
        const usuariosQuery = query(
            userCollection,
            where("inote_email", "==", correo),
            where("inote_password", "==", contraseña)
        );
        const usuariosSnapshot = await getDocs(usuariosQuery);

        if (usuariosSnapshot.empty) {
            return null;
        } else {
            // El usuario existe y los datos son correctos
            const primerUsuario = usuariosSnapshot.docs[0]; // Obtener el primer documento de la consulta
            const inote_user = {
                inote_email: primerUsuario.data().inote_email,
                inote_user_name: primerUsuario.data().inote_user_name,
                inote_full_name: primerUsuario.data().inote_full_name,
                inote_id: primerUsuario.id,
            };
            return inote_user;
        }
    }

     function handleSubmit(e) {
        e.preventDefault();
        validarUsuario(inote_email, inote_password)
            .then(async (u) => {
                if (u) {
                    matchPasError = false;
                    $isLog = true;
                    $user = u;
                    const res = await fetch("/server", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(u),
                    });
                    if(res.status === 201)
                        goto("/",);
                } else {
                    matchPasError = true;
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }
</script>

<form on:submit={handleSubmit}>
    {#if matchPasError}
        <p class="text-red-700 my-4">
            password or email are incorrect or not exist the credential
        </p>
    {/if}
    <div class="grid md:grid-cols-2 md:gap-6">
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
    </div>

    <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button
    >
</form>
