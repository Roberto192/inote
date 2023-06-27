<script>
    import { blur } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { createEventDispatcher } from "svelte"

    export let title = "New note"
    export let text = ""

    const dispatch = createEventDispatcher()

    function sendData(){
        dispatch("sendData", {title, text})
    }
</script>

<div
            transition:blur={{
                delay: 0,
                duration: 200,
                opacity: 0.5,
                easing: quintOut,
            }}
            class="absolute bg-gray-700 p-1 rounded-t-2xl shadow-xl shadow-zinc-950 z-50"
        >
            <div class="grid grid-cols-4">
                <input
                    bind:value={title}
                    type="text"
                    class="truncate bg-transparent border-none col-span-3 outline-none appearance-none focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="New note"
                />
                <a
                    href="/#"
                    class="absolute self-center right-1"
                    on:click={sendData}
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
            </div>
            <hr />
            <div class="flex mt-4">
                <textarea
                    class="resize-none w-full bg-transparent border-none outline-none appearance-none focus:border-transparent focus:outline-none focus:ring-0"
                    bind:value={text}
                    placeholder="Type..."
                    style="height: 50vh;"
                />
            </div>
        </div>