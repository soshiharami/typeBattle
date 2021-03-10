<script lang="ts" xmlns="http://www.w3.org/1999/html">
  import word from 'src/word.json';
  import { onMount } from 'svelte';
  import store from 'src/store';

  const nullSendWebSocket = { message: '', room: null, meta: 'null' };
  let enemyTypeWord = '';

  const userDara = {
    name: word.word[Math.floor(Math.random() * word.word.length)],
    typeWord: '',
    score: 0,
    room: 0,
    isStart: false,
    isReady: true,
  };

  onMount(() => {
    store.subscribable((currentType) => {
      const tmpEnemyTypeWord = JSON.parse(currentType || JSON.stringify(nullSendWebSocket)).message;
      if (userDara.typeWord != tmpEnemyTypeWord) {
        enemyTypeWord = tmpEnemyTypeWord;
      }
    });
  });

  const checkString = () => {
    if (userDara.typeWord == userDara.name) {
      userDara.score += userDara.name.length * 10;
      userDara.name = word.word[Math.floor(Math.random() * word.word.length)];
      userDara.typeWord = '';
    }
    userDara.score = userDara.score - 1;
    store.sendType(
      JSON.stringify({
        message: userDara.typeWord,
        roomId: userDara.room,
        meta: 'message',
      }),
    );
  };

  const join = () => {
    store.sendType(
      JSON.stringify({
        message: userDara.typeWord,
        roomId: userDara.room,
        meta: 'join',
      }),
    );
    userDara.isReady = false;
    userDara.isStart = true;
  };
</script>

<main>
  {#if userDara.isReady}
    <div>
      <label>
        <input type="text" bind:value="{userDara.room}" />
      </label>
    </div>
    <button on:click="{join}"> 入る </button>
  {/if}

  {#if userDara.isStart}
    <h5>{userDara.room}</h5>
    <h1>{userDara.name}</h1>
    <h1>{userDara.typeWord}</h1>
    <h1>{enemyTypeWord}</h1>
    <label on:input="{checkString}">
      <input type="text" bind:value="{userDara.typeWord}" />
    </label>
    score {userDara.score}
  {/if}
</main>

<style src="src/style/main.scss">
</style>
