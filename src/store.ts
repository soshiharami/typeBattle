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
  name: "",
  typeWord: '',
  score: 0,
  isStart: false,
  isReady: true,
});

const matchData = writable({
  word: word.word[Math.floor(Math.random() * word.word.length)],
  room: 0
})

export default {
  subscribable: typeWordStore.subscribe,
  sendType,
  userData,
  matchData
};
