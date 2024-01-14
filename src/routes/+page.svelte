<script>
	import {containers} from "$lib/stores.ts";

	function removeContainer(index) {
		$containers.splice(index, 1);
		$containers = $containers;
	}

	function calculateOutput(cmRatio, wcRatio, containers) {
		if(!cmRatio || !wcRatio || !containers || !containers.length > 0 || !parseInt(cmRatio) || !parseInt(wcRatio)) {
			return { water: 'N/A', coffee: 'N/A', milk: 'N/A' };
		}

		let parsedCmRatio = parseInt(cmRatio);
		let parsedWcRatio = parseInt(wcRatio);

		parsedCmRatio = parsedCmRatio / 100;

		let totalGramsOfWater = 0;
		let containerMeasurements = [];

		containers.forEach((container) => {
			let water = container.weight * parsedCmRatio;
			totalGramsOfWater += water;
			let milk = (container.weight - water) * 1.03;
			containerMeasurements = [...containerMeasurements, {...container, water, milk}];
		});

		let coffee = totalGramsOfWater / parsedWcRatio;

		let output = {water: totalGramsOfWater, coffee, containers: containerMeasurements };
		console.log(output);
		return output;
	}

	let coffeeMilkRatio = 40;
	let waterCoffeeRatio = 15;
	let output = {};

	$: output = calculateOutput(coffeeMilkRatio, waterCoffeeRatio, $containers);
</script>

<div class="container h-full mx-auto flex justify-center items-center py-24 md:py-0">
	<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 items-center justify-center">
		<div class="card p-4 md:w-96">
			<header class="card-header text-center">Input</header>
			<section class="p-4">
				<div class="flex flex-col space-y-4">
					<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between">
						<div class="flex flex-col items-center justify-center space-y-2">
							<p>Coffee <span class="text-primary-500">:</span> Milk</p>
							<div>
								<!--<input class="input min-w-0 w-16" title="Input (text)" type="number" value="50" /><span class="-ml-6 z-[500]">%</span>-->
								<div class="input-group input-group-divider flex flex-row max-w-24">
									<input bind:value={coffeeMilkRatio} class="w-16 text-center" type="number" style="min-width:0px !important" />
									<div class="input-group-shim !text-primary-500">%</div>
								</div>
							</div>
						</div>
						<div class="flex flex-col items-center justify-center space-y-2">
							<p>Water <span class="text-primary-500">:</span> Coffee</p>
							<div class="flex flex-row justify-center items-center space-x-2">
								<input class="input w-16 text-center !cursor-default pointer-events-none" type="number" value="1" disabled style="min-width:0px !important" />
								<p class="text-primary-500">:</p>
								<input bind:value={waterCoffeeRatio} class="input w-16 text-center" type="number" style="min-width:0px !important" />
							</div>
						</div>
					</div>

					<div class="flex flex-col space-y-2">
						<p class="text-center">Containers</p>
						<div class="flex flex-col space-y-2 justify-center items-center">
							<!-- Each container here -->
							{#each $containers || [] as container, i}
								<div class="card p-2">
									<div class="flex flex-row justify-between items-center">
										<div>
											{container.name} - <span class="text-primary-500">{container.weight}g</span>
										</div>
										<div>
											<button type="button" class="btn-icon btn-icon-sm hover:text-primary-500" on:click={() => {removeContainer(i)}}><i class="fa-solid fa-x"></i></button>
										</div>
									</div>
								</div>
							{/each}

						</div>
					</div>
				</div>
			</section>
		</div>

		<i class="fa-solid fa-arrow-right text-primary-500 hidden md:block"></i>
		<i class="fa-solid fa-arrow-down text-primary-500 md:hidden"></i>

		<div class="card p-4 md:w-96">
			<header class="card-header text-center">Output</header>
			<section class="p-4">
				{#await output then results}
					<div class="flex flex-col space-y-4">
						<div class="flex flex-col justify-center items-center">
							<p class="text-center">Coffee to make:</p>
							<p>Water: <span class="text-primary-500">{Number(results.water).toFixed(1)}g</span></p>
							<p>Coffee grinds: <span class="text-primary-500">{Number(results.coffee).toFixed(1)}g</span></p>
						</div>

						<div class="flex flex-col space-y-2 items-center justify-center">
							Per container:
							{#each results.containers || [] as container, i}
								<div class="card p-2">
									<div>
										Big Glass - <span class="text-primary-500">{container.water.toFixed(1)}g</span> coffee & <span class="text-primary-500">{container.milk.toFixed(1)}g</span> milk
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/await}
			</section>
		</div>
	</div>

</div>

<style lang="postcss">

</style>
