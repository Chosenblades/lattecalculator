<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Footer from '$lib/Footer.svelte';
	import SidebarLeft from "$lib/SidebarLeft.svelte";
	import SidebarRight from "$lib/SidebarRight.svelte";
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import AddContainerModal from "$lib/AddContainerModal.svelte";
	import { Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from "@skeletonlabs/skeleton";

	initializeStores();

	const drawerStore = getDrawerStore();

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		addContainerModal: { ref: AddContainerModal },
	};

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	function drawerOpen() {
		drawerStore.open({});
	}
</script>

<Modal components={modalRegistry} />
<Drawer>
	<SidebarLeft />
</Drawer>
<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 lg:w-80" slotHeader="md:hidden">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
            			<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
            			</span>
					</button>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<SidebarLeft />
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<!--<SidebarRight />-->
	</svelte:fragment>
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<!--<Footer />-->
	</svelte:fragment>
	<!-- (footer) -->
</AppShell>
