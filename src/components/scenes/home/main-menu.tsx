import { StarcraftButton } from "@/components/ui/starcraft-button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MainMenu() {
  const [gameCode, setGameCode] = useState("");
  const router = useRouter();

  function onCreateGame() {
    router.push("/r/750128");
  }

  function onJoinGame() {
    router.push("/r/750128");
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="relative w-[600px] p-8 backdrop-blur-[0.4px] bg-black/30 border-2 border-cyan-500/20">
        <div className="relative z-10 flex flex-col items-center">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="font-starcraft text-6xl text-cyan-300 tracking-wider mb-4">
              DEEP  COVER
            </h1>
            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-4" />
            <p className="text-cyan-200/80 font-starcraft text-sm max-w-md">
              Humanity&apos;s final hope. Deception and Deduction. Can you spot
              the infiltrators before the arrival day?
            </p>
          </div>

          {/* Menu Options */}
          <div className="flex flex-col gap-6 w-full max-w-xs">
            <StarcraftButton
              size="lg"
              className="w-full"
              onClick={onCreateGame}
            >
              CREATE GAME
            </StarcraftButton>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-cyan-500/20"></div>
              </div>
              <div className="relative px-4">
                <span className="text-cyan-400/60 font-starcraft text-sm">
                  OR
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Enter game code"
                className="w-full px-4 py-2 bg-black/80 border-2 border-cyan-500/30 text-cyan-300 font-starcraft placeholder-cyan-500/30 focus:outline-none focus:border-cyan-500/50"
              />
              <StarcraftButton
                size="lg"
                variant="secondary"
                className="w-full"
                disabled={!gameCode.trim()}
                onClick={onJoinGame}
              >
                JOIN GAME
              </StarcraftButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
