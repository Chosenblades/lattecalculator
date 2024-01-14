<script>
    import {getModalStore} from '@skeletonlabs/skeleton';
    import { savedContainers } from '$lib/stores.ts';

    const modalStore = getModalStore();

    let name = "";
    let grams = "";

    function closeModal() {
        modalStore.close();
    }

    function addContainer() {
        try {
            let weight = parseInt(grams);
            let container = { name, weight };
            $savedContainers = [...$savedContainers, container];
            modalStore.close();
        } catch (e) {
            //handle error messages?
        }
    }
</script>

<div class="card p-4">
    <header class="card-header text-center">Add Container</header>
    <section class="p-4">
        <div class="flex flex-col space-y-2">
            <label class="label">
                <span>Name</span>
                <input class="input" title="Name" type="text" placeholder="Big glass" bind:value={name}/>
            </label>

            <label class="label">
                <span>Weight (grams)</span>
                <input class="input" title="Weight (g)" type="number" placeholder="270" bind:value={grams}/>
            </label>
        </div>
    </section>
    <footer class="card-footer">
        <div class="flex flex-row space-x-2 justify-between">
            <button type="button" class="btn variant-filled-error" on:click={closeModal}>Cancel</button>
            <button type="button" class="btn variant-filled-primary" on:click={addContainer}>Add Container</button>
        </div>

    </footer>
</div>