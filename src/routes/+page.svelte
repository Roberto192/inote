<script>
    import CardMas from "./CardMas.svelte";
    import { noteCollection } from "../firebase";
    import { isLog, user } from "../stores";
    import { getDocs, query, where } from "firebase/firestore";
    import { goto } from "$app/navigation";

    export let data = null
    $user = data
    $isLog = Object.keys($user).length !== 0

    const handleNotes = async (e) => {
        try {
            const queryNote = query(noteCollection, where("id", "==", $user.inote_id));
            const data = await getDocs(queryNote);

            return data.docs;
        } catch (error) {
            console.log(error)
        }
    };
    let notes
    if($isLog){
        notes = handleNotes();
    }
</script>

<div
    class="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-x-2 gap-y-4 justify-normal ml-10"
>
    <CardMas
        on:changeData={() => {
            notes = handleNotes();
        }}
    />
    {#if notes}
        {#await notes}
            <h1>Cargando...</h1>
        {:then note}
            {#each note as n}
                <CardMas
                    on:changeData={() => {
                        notes = handleNotes();
                    }}
                    idCard={n.id}
                    titleCard={n.data().title}
                    textCard={n.data().text}
                />
            {/each}
        {/await}
    {/if}
</div>
