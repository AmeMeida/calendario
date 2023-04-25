<script lang="ts">
  import Calendar from './lib/Calendar.svelte';

  let monthSize: number = 30;
  let weekSize: number = 7;
  let months: number = 12;
  let year: number = 1;
</script>

<main>
  <h1>Calendar</h1>

  <label for="year">Ano:</label>
  <input type="number" id="year" bind:value={year} min={1} />

  <label for="month-size">Tamanho do mês:</label>
  <input type="number" id="month-size" bind:value={monthSize} min={1} />

  <label for="week-size">Tamanho da semana:</label>
  <input type="number" id="week-size" bind:value={weekSize} min={1} />

  <label for="months">Quantidade de meses:</label>
  <input type="number" id="months" bind:value={months} min={1} />

  <Calendar {monthSize} {weekSize} {months} {year} />
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-block: 3rem;
    flex-direction: column;
  }
</style>
