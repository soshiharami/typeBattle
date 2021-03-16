<script lang="ts">
  import { onMount } from 'svelte';
  import store from 'src/store';

  const nullSendWebSocket = { message: '', room: null, meta: 'null' };
  let enemyTypeWord = '';
  let userData = store.userData;
  let matchData = store.matchData;
  let words: string[] = []

  onMount(() => {
    store.subscribable((currentType) => {
      const tmpEnemyData = JSON.parse(currentType || JSON.stringify(nullSendWebSocket));
      if (tmpEnemyData.meta === "word"){
        words = words.concat(tmpEnemyData.message).filter((x, i, self) => {
          return self.indexOf(x) === i;
        })
        $matchData.word = words[Math.floor(Math.random() * words.length)];
      } if(tmpEnemyData.meta === "join"){
        const sendWord = {
          message: words,
          roomId: $matchData.room,
          meta: 'word',
        };
        store.sendType(JSON.stringify(sendWord))
        console.log("じょいん")
      } else if ($userData.typeWord != tmpEnemyData.message) {
        enemyTypeWord = tmpEnemyData.message;
      }
    });
  });

  const checkString = () => {
    if ($userData.typeWord == $matchData.word) {
      $userData.score += $matchData.word.length * 10;
      $matchData.word = words[Math.floor(Math.random() * words.length)];
      $userData.typeWord = '';
    }
    $userData.score = $userData.score - 1;
    store.sendType(
      JSON.stringify({
        message: $userData.typeWord,
        roomId: $matchData.room,
        meta: 'message',
      }),
    );
  };
</script>

<main>
  <h5>{$matchData.room}</h5>
  <h1>{$matchData.word}</h1>
  <h1>{$userData.typeWord}</h1>
  <h1>{enemyTypeWord}</h1>
  <label on:input="{checkString}">
    <input type="text" bind:value="{$userData.typeWord}" oncopy={"return false"} onpaste={"return false"}
    oncontextmenu={"return false"} />
  </label>
  score {$userData.score}
</main>

<style src="./styles/main.scss">
</style>
