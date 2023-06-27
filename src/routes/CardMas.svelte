<script>
    import InputCard from "./InputCard.svelte";
    import { isLog, user } from "../stores";
    import { noteCollection } from "../firebase";
    import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function changeData() {
        dispatch("changeData", null);
    }

    let showForm = false;

    export let titleCard = "New note";
    export let textCard = "";
    export let idCard = "";

    const handleClick = (e) => {
        e.preventDefault();
        showForm = true;
    };

    const handleData = async (e) => {
        const { title, text } = e.detail;
        const note = {
            title,
            text,
            id: $user.inote_id,
        };
        showForm = false;
        if (idCard !== "") {
            if (title !== titleCard || text !== textCard) {
                await updateDoc(doc(noteCollection, idCard), note);
                titleCard = title;
                textCard = text;
            } else {
                return e;
            }
        } else {
            if (title !== "New note" || text !== "") {
                await addDoc(noteCollection, note);
                changeData();
            } else {
                return e;
            }
        }
    };

    const handleErase = async (e)=>{
        const userRef = doc(noteCollection, idCard);
        await deleteDoc(userRef);
        changeData();
    }
</script>

<div class="relative h-40">
    {#if idCard}
        <a
            id="btn-erase"
            href="/#"
            class="absolute right-2 top-2"
            on:click={handleErase}
        >
            <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="Edit / Close_Circle">
                    <path
                        id="Vector"
                        d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </svg>
        </a>
    {/if}
    <div
        id={idCard}
        class="bg-gray-800 p-4 text-gray-300 rounded h-full max-w-full flex justify-center shadow-blue-950 shadow-md"
    >
        {#if showForm}
            <InputCard
                title={titleCard}
                text={textCard}
                on:sendData={handleData}
            />
        {/if}

        <a href="/#" on:click={handleClick}>
            <h4 class="text-center font-bold">{titleCard}</h4>
            <div class="inline-flex items-center justify-center w-full">
                <hr
                    class="max-w-full w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"
                />
            </div>

            {#if textCard}
                <div class="w-auto px-3 overflow-hidden">
                    <h1 class="max-w-full max-h-full overflow-hidden">{textCard.substring(0, 80)}</h1>
                </div>
            {:else}<div class="w-10 h-10 mx-auto">
                    <svg
                        viewBox="0 -0.5 21 21"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                        <title>plus_circle [#1441]</title>
                        <desc>Created with Sketch.</desc>
                        <defs />
                        <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                        >
                            <g
                                id="Dribbble-Light-Preview"
                                transform="translate(-419.000000, -520.000000)"
                                fill="rgb(209 213 219)"
                            >
                                <g
                                    id="icons"
                                    transform="translate(56.000000, 160.000000)"
                                >
                                    <path
                                        d="M374.55,369 L377.7,369 L377.7,371 L374.55,371 L374.55,374 L372.45,374 L372.45,371 L369.3,371 L369.3,369 L372.45,369 L372.45,366 L374.55,366 L374.55,369 Z M373.5,378 C368.86845,378 365.1,374.411 365.1,370 C365.1,365.589 368.86845,362 373.5,362 C378.13155,362 381.9,365.589 381.9,370 C381.9,374.411 378.13155,378 373.5,378 L373.5,378 Z M373.5,360 C367.70085,360 363,364.477 363,370 C363,375.523 367.70085,380 373.5,380 C379.29915,380 384,375.523 384,370 C384,364.477 379.29915,360 373.5,360 L373.5,360 Z"
                                        id="plus_circle-[#1441]"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            {/if}
        </a>
    </div>
</div>
