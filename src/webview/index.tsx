import React from "react";
import { createRoot } from "react-dom/client";
import PomodoroApp from "./PomodoroApp";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<PomodoroApp />);
}
