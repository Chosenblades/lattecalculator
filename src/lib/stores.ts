import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

export const savedContainers: Writable<Array<object>> = localStorageStore('savedContainers', []);
export const containers: Writable<Array<object>> = localStorageStore('containers', []);