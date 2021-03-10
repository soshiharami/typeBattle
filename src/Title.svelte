<script lang="ts">
  import store from 'src/store';

  let userData = store.userData;

  const join = () => {
    const sendMessage = {
      message: $userData.typeWord,
      roomId: $userData.room,
      meta: 'join',
    };
    store.sendType(JSON.stringify(sendMessage));
    $userData.isReady = false;
    $userData.isStart = true;
  };
</script>

<main>
  <div>
    <label>
      <input type="text" bind:value="{$userData.room}" />
    </label>
  </div>
  <button on:click="{join}"> 入る</button>
</main>


