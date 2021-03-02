<script lang="ts" xmlns="http://www.w3.org/1999/html">
  import word from 'src/word.json'
  import {onMount} from "svelte";
  import store from "src/store";

  let name: string = word.word[Math.floor(Math.random() * word.word.length)];
  let typeWord: string = "";
  let score: number = 0;
  let enemyTypeWord: string = "";
  let room: number = 0;
  let isStart;
  let isReady = true;
  const nullSendWebSocket: sendWebSocket = {message: "", room: null, meta: "null"}

  type sendWebSocket = {
    message: string,
    room: number,
    meta: string
  }

  onMount(() => {
    store.subscribable(currentType => {
      const tmpEnemyTypeWord =
        JSON.parse(currentType || JSON.stringify(nullSendWebSocket)).message
      if (typeWord != tmpEnemyTypeWord) {
        enemyTypeWord = tmpEnemyTypeWord;
      }
    })
  })

  const checkString = () => {
    if (typeWord == name) {
      score += name.length * 10
      name = word.word[Math.floor(Math.random() * word.word.length)];
      typeWord = "";
    }
    score = score - 1;
    store.sendType(JSON.stringify({message: typeWord, roomId: room, meta: "message"}))
  }

  const join = () => {
    store.sendType(JSON.stringify({message: typeWord, roomId: room, meta: "join"}));
    isReady = false
    isStart = true
  }
</script>

<main>
    {#if isReady}
        <div>
            <label>
                <input type="text" bind:value={room}>
            </label>
        </div>
        <button on:click={join}>
            入る
        </button>
    {/if}

    {#if isStart}
        <h5>{room}</h5>
        <h1>{name}</h1>
        <h1>{typeWord}</h1>
        <h1>{enemyTypeWord}</h1>
        <label on:input={checkString}>
            <input type="text" bind:value={typeWord}>
        </label>
        score {score}

    {/if}
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
      overflow-wrap: break-word;
    }

    @media (min-width: 640px) {
      max-width: none;
    }
  }
</style>
