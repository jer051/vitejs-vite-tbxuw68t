import { useState } from "react";

export default function App() {
  const [gameType, setGameType] = useState<"cton" | "team">("cton");
  const [players, setPlayers] = useState([{ name: "", rank: 1 }]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mod, setMod] = useState("MPT");

  const addPlayer = () => {
    setPlayers([...players, { name: "", rank: players.length + 1 }]);
  };

  const updatePlayer = (index: number, value: string) => {
    const updated = [...players];
    updated[index].name = value;
    setPlayers(updated);
  };

  const handleSubmit = () => {
    const data = {
      type: gameType,
      mod,
      players,
      notes,
      date: new Date().toISOString(),
    };
    console.log("Submitted game data:", data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Civ 3 Game Reporter</h1>

        <label className="block mb-2 font-medium">Game Type</label>
        <select
          className="w-full mb-4 p-2 border rounded"
          value={gameType}
          onChange={(e) => setGameType(e.target.value as "cton" | "team")}
        >
          <option value="cton">CTON</option>
          <option value="team">Team Game</option>
        </select>
        <label className="block mb-2 font-medium">Mod</label>
        <select
          className="w-full mb-4 p-2 border rounded"
          value={mod}
          onChange={(e) => setMod(e.target.value)}
        >
          <option value="MPT">MPT</option>
          <option value="MOD">MOD</option>
          <option value="FUT">FUT</option>
          <option value="MDJ">MDJ</option>
          <option value="QC">QC</option>
        </select>


        {players.map((player, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-medium">
              Player {index + 1}
            </label>
            <input
              className="w-full border rounded p-2"
              type="text"
              value={player.name}
              placeholder="Enter player name"
              onChange={(e) => updatePlayer(index, e.target.value)}
            />
          </div>
        ))}

        {gameType === "cton" && players.length < 8 && (
          <button
            className="mt-2 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={addPlayer}
          >
            Add Player
          </button>
        )}

        <label className="block mb-1 font-medium">Notes</label>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit Game
        </button>

        {submitted && (
          <div className="mt-6 p-4 bg-gray-50 border rounded text-sm">
            <h2 className="font-semibold mb-2">Game Submitted ✅</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify({ type: gameType, mod, players, notes }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
