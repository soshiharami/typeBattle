<script lang="ts" xmlns="http://www.w3.org/1999/html">
  import Title from 'src/Title.svelte';
  import store from 'src/store';
  import Battle from './Battle.svelte';

  let userData = store.userData;
</script>

<main>
  {#if $userData.isReady}
    <Title />
  {/if}

  {#if $userData.isStart}
    <Battle />
  {/if}
</main>


