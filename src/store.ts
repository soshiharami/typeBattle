import { writable } from "svelte/store";
import word from 'src/word.json';

const typeWordStore = writable("");

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
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

const userData = writable({
  name: word.word[Math.floor(Math.random() * word.word.length)],
  typeWord: '',
  score: 0,
  room: 0,
  isStart: false,
  isReady: true,
});

export default {
  subscribable: typeWordStore.subscribe,
  sendType,
  userData: userData
};
