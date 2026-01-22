import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js"

const App: Component = () => {
  const [count, setCount] = createSignal(0)
  const increment = () => setCount((prev) => prev + 1)

  createEffect(() => {
    console.log(count());
  });

  return (
    <>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind! {count()}</p>
      <button onclick={increment}>Increment</button>
    </>
  );
};

export default App;
