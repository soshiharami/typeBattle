import { writable } from "svelte/store";

const typeWordStore = writable("");

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", (e) => {
  console.log("open");
});

socket.addEventListener("message", (e) => {
  typeWordStore.set(e.data);
});

const sendType = (data: string) => {
  if (socket.readyState <= 1) {
    socket.send(data);
  }
};

export default {
  subscribable: typeWordStore.subscribe,
  sendType,
};
