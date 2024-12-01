"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const PomodoroApp = () => {
    const [timeLeft, setTimeLeft] = (0, react_1.useState)(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isRunning, timeLeft]);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };
    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
    };
    return (react_1.default.createElement("div", { style: { padding: "20px", textAlign: "center" } },
        react_1.default.createElement("h2", null, "Pomodoro Timer"),
        react_1.default.createElement("div", { style: { fontSize: "48px", margin: "20px 0" } }, formatTime(timeLeft)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: toggleTimer, style: {
                    marginRight: "10px",
                    padding: "8px 16px",
                    fontSize: "16px",
                } }, isRunning ? "Pause" : "Start"),
            react_1.default.createElement("button", { onClick: resetTimer, style: {
                    padding: "8px 16px",
                    fontSize: "16px",
                } }, "Reset"))));
};
exports.default = PomodoroApp;
//# sourceMappingURL=PomodoroApp.js.map