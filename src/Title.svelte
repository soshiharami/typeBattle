<script lang='ts'>
  import store from 'src/store';

  let userData = store.userData;
  let matchData = store.matchData;
  let word: string[] = new Array(5);

  const join = () => {
    const sendMessage = {
      message: word,
      roomId: $matchData.room,
      meta: 'join',
    };
    const sendWord = {
      message: word,
      roomId: $matchData.room,
      meta: 'word',
    };
    store.sendType(JSON.stringify(sendMessage));
    store.sendType(JSON.stringify(sendWord));
    $userData.isReady = false;
    $userData.isStart = true;
  };
</script>

<main>
  <div>
    <h2> ルームID (四桁) </h2>
    <label>
      <input type='number' bind:value='{$matchData.room}' />
    </label>
  </div>

  <div>
    <h2> 対戦ワード </h2>
    {#each word as {}, i}
      <label>
        <input type='text' bind:value='{word[i]}'>
      </label>
    {/each}
  </div>

  <button on:click='{join}'> 入る</button>
</main>


