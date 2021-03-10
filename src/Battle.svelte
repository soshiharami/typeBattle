<script lang="ts">
  import { onMount } from 'svelte';
  import word from 'src/word.json';
  import store from 'src/store';

  const nullSendWebSocket = { message: '', room: null, meta: 'null' };
  let enemyTypeWord = '';
  let userData = store.userData;

  onMount(() => {
    store.subscribable((currentType) => {
      const tmpEnemyTypeWord = JSON.parse(currentType || JSON.stringify(nullSendWebSocket)).message;
      if ($userData.typeWord != tmpEnemyTypeWord) {
        enemyTypeWord = tmpEnemyTypeWord;
      }
    });
  });

  const checkString = () => {
    if ($userData.typeWord == $userData.name) {
      $userData.score += $userData.name.length * 10;
      $userData.name = word.word[Math.floor(Math.random() * word.word.length)];
      $userData.typeWord = '';
    }
    $userData.score = $userData.score - 1;
    store.sendType(
      JSON.stringify({
        message: $userData.typeWord,
        roomId: $userData.room,
        meta: 'message',
      }),
    );
  };
</script>

<main>
  <h5>{$userData.room}</h5>
  <h1>{$userData.name}</h1>
  <h1>{$userData.typeWord}</h1>
  <h1>{enemyTypeWord}</h1>
  <label on:input="{checkString}">
    <input type="text" bind:value="{$userData.typeWord}" />
  </label>
  score {$userData.score}
</main>

<style src="./styles/main.scss">
</style>
