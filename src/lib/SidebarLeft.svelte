<script lang="ts">
    import {getModalStore} from '@skeletonlabs/skeleton';
    import { savedContainers, containers } from '$lib/stores.ts';

    const modalStore = getModalStore();

    const modal: ModalSettings = {
        type: 'component',
        component: 'addContainerModal',
    };

    function triggerModal() {
        modalStore.trigger(modal);
    }

    function removeSavedContainer(index) {
        $savedContainers.splice(index, 1);
        $savedContainers = $savedContainers;
    }

    function copyContainer(index) {
        $containers = [...$containers, $savedContainers[index]]
    }

</script>

<div class="w-80 h-full bg-surface-100-800-token flex flex-col justify-between p-4">
    <div>
        <div class="text-center pt-2">
            Saved Containers
        </div>

        <div class="space-y-4 flex flex-col justify-center p-4">
            {#each $savedContainers || [] as container, i}
                <div class="card p-4">
                    <div class="flex flex-row justify-between items-center">
                        <div>
                            {container.name} - <span class="text-primary-500">{container.weight}g</span>
                        </div>
                        <div>
                            <button type="button" class="btn-icon btn-icon-sm hover:text-primary-500" on:click={() => {removeSavedContainer(i)}}><i class="fa-solid fa-x"></i></button>
                            <button type="button" class="btn-icon btn-icon-sm hover:text-primary-500" on:click={() => {copyContainer(i)}}><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <button type="button" class="btn variant-filled-primary" on:click={triggerModal}>Add Container</button>

</div>