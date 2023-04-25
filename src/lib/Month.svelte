<script lang="ts">
  import { range, weekDays, type Day } from "./utils";

  export let monthSize: number = 30;
  export let weekSize: number = 7;
  export let year: number = 1;
  export let month: number = 1;
  export let months: number = 12;

  function genMonth(monthSize: number, weekSize: number, month: number, year: number): Array<Day> {
    const offset = getOffset(month, weekSize, monthSize, year, months);
    const days: Array<Day> = [];

    for (let i = 0; i < weekSize; i++) {
      days.push({
        day: weekDays.get(i) ?? (i + 1).toString(),
        month: month,
        weekDay: i + 1,
      });
    }

    for (let i = 0; i < offset; i++) {
      days.push({
        day: null,
        month: month,
        weekDay: i + 1,
      });
    }

    for (let i = 1; i <= monthSize; i++) {
      days.push({
        day: i,
        month: month,
        weekDay: (i + offset) % weekSize || weekSize,
      });
    }

    return days;
  }

  function getOffset(month: number, weekSize: number, monthSize: number, year: number, months: number): number {
    return ((month - 1) + ((year - 1) * months)) * monthSize % weekSize;
  }

  // ((1  + (2 - 1) * 12) * 30 % 7

  $: days = genMonth(monthSize, weekSize, month, year);

  function getWeekDaysCount(days: Day[]) {
    let weekDaysCount: Record<number, number> = {};
    days.forEach((day) => {
      if (day.day === null || typeof day.day === "string") {
        return;
      }

      let curr = weekDaysCount[day.weekDay] || 0;
      weekDaysCount[day.weekDay] = curr + 1;
    });

    return weekDaysCount;
  }

  $: weekDaysCount = getWeekDaysCount(days);
</script>

<div class="month-info">
  <div class="month" style={`grid-template-columns: repeat(${weekSize}, 1fr);`}>
    {#each days as day}
      {#if day.day === null}
        <div class="day" />
      {:else if typeof day.day === "string"}
        <div class="day title">{day.day}</div>
      {:else}
        <div class="day">{day.day}</div>
      {/if}
    {/each}
  </div>
  
  <div class="info">
    <p>Year: {year}</p>
    <p>Month: {month}</p>
    <p>Month size: {monthSize}</p>
    <p>Week size: {weekSize}</p>
    <p>Offset: {getOffset(month, weekSize, monthSize, year, months)}</p>
    <br>
    {#each Object.entries(weekDaysCount) as [key, value]}
      <p class="weekdays"><b>{weekDays.get(parseInt(key) - 1) ?? key}:</b>   {value}</p>
    {/each}
  </div>
</div>

<style>
  div.month {
    display: grid;
    border: black solid 1px;
  }

  div.month-info {
    display: flex;
    flex-direction: row;
    align-items: start;
    column-gap: 1rem;
    margin-block: 2rem;
  }

  div.day {
    min-width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
  }

  div.title {
    background-color: #ccc;
  }

  .weekdays {
    display: flex;
    justify-content: space-between;
    max-width: 12ch;
  }
</style>
