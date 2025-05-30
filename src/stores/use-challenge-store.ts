import { Challenge } from "@/models/challenge";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useGame } from "./use-game-store";
import { logStoreError } from "@/utils/error";

interface ChallengeState {
  challenge: Challenge | null;
  participantsId: string[];
  prompt: string | null;
  stage: "preparation" | "gameplay" | "discussion";

  submitted: string[];

  answers: Record<string, string>;
  timeRemaining: number;
}

interface ChallengeActions {
  resetChallenge: () => void;
  selectChallenge: (challengeId: string) => void;
  selectParticipant: (playerId: string) => void;
  setPrompt: (prompt: string) => void;
  setAnswers: (answers: Record<string, string>) => void;
  setSubmitted: (playerId: string) => void;
  startChallenge: () => void;
  startDiscussing: () => void;
  decremmentTimeRemaining: () => void;
}

export const useChallenge = create<ChallengeState & ChallengeActions>()(
  immer((set) => ({
    challenge: null,
    participantsId: [],
    prompt: null,
    stage: "preparation",

    submitted: [],

    answers: {},
    timeRemaining: 60,

    resetChallenge: () => {
      set((state) => {
        state.challenge = null;
        state.participantsId = [];
        state.prompt = null;
        state.stage = "preparation";

        state.submitted = [];

        state.answers = {};
        state.timeRemaining = 60;
      });
    },

    selectChallenge: (challengeId: string) => {
      set((state) => {
        const challenge = useGame
          .getState()
          .challenges.find((ch) => ch.id === challengeId);

        if (!challenge) {
          return logStoreError("selectChallenge", "No challenge found");
        }

        state.challenge = challenge;
      });
    },

    selectParticipant: (participantId: string) => {
      set((state) => {
        const alreadySelected = state.participantsId.some(
          (sp) => sp === participantId
        );

        if (alreadySelected) {
          state.participantsId = state.participantsId.filter(
            (sp) => sp !== participantId
          );
          return;
        }

        if (state.challenge?.nPlayers === state.participantsId.length) {
          return;
        }

        state.participantsId.push(participantId);
      });
    },

    setPrompt: (prompt: string) => {
      set((state) => {
        state.prompt = prompt;
      });
    },

    setAnswers: (answers: Record<string, string>) => {
      set((state) => {
        state.answers = answers;
      });
    },

    setSubmitted: (doneParticipantId: string) => {
      set((state) => {
        state.submitted.push(doneParticipantId);
      });
    },

    startChallenge: () => {
      set((state) => {
        if (
          state.stage !== "preparation" ||
          state.challenge === null ||
          state.participantsId.length !== state.challenge.nPlayers
        ) {
          logStoreError("startChallenge", "cannot change stage to gameplay");
          return;
        }

        state.stage = "gameplay";
      });
    },

    startDiscussing: () => {
      set((state) => {
        if (
          state.stage !== "gameplay" &&
          Object.keys(state.answers).length === 0
        ) {
          logStoreError("startDiscussing", "cannot change stage to discussion");
          return;
        }
        state.stage = "discussion";
      });
    },

    decremmentTimeRemaining: () => {
      set((state) => {
        state.timeRemaining--;
      });
    },
  }))
);
