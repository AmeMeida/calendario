<script lang="ts">
  import Month from "./Month.svelte";
  import { range } from "./utils";

  export let monthSize: number = 30;
  export let weekSize: number = 7;
  export let months: number = 12;
  export let year: number = 1;
</script>

<div>
  {#each range(1, months) as month}
    {#if month != 1}
      <hr />
    {/if}
    <span>Month: {month}</span>
    <Month {monthSize} {weekSize} {month} {year} {months} />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  span {
    align-self: start;
  }

  hr {
    width: 100%;
    margin-block: 2rem;
  }
</style>
