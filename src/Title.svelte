<script lang="ts">
  import store from 'src/store';

  let userData = store.userData;
  let matchData = store.matchData;
  let word: string;

  const join = () => {
    const sendMessage = {
      message: $userData.typeWord,
      roomId: $matchData.room,
      meta: 'join',
    };
    const sendWord = {
      message: word,
      roomId: $matchData.room,
      meta: 'word',
    }
    store.sendType(JSON.stringify(sendMessage));
    store.sendType(JSON.stringify(sendWord));
    $userData.isReady = false;
    $userData.isStart = true;
  };
</script>

<main>
  <div>
    <label>
      <input type="number" bind:value="{$matchData.room}" />
    </label>
  </div>

  <div>
    <label>
      <input type='text' bind:value="{word}">
    </label>
  </div>
  <button on:click="{join}"> 入る</button>
</main>


