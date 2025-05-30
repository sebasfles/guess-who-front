import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface VoteState {
  votes: Record<string, string>;
  stage: "waiting" | "voting" | "results";
  initiatorId: string | null;
  playersWhoCalledVote: string[];
  countdownSeconds: number;
}

interface VoteActions {
  addVote: (playerId: string, vote: string) => void;
  callVote: (playerId: string) => void;
  resetVote: () => void;
  startWaiting: () => void;
  startVoting: () => void;
  showResults: () => void;
  decreaseCountdown: () => void;
}

export const useVoteStore = create<VoteState & VoteActions>()(
  immer((set) => ({
    votes: {},
    stage: "waiting",
    initiatorId: null,
    playersWhoCalledVote: [],
    countdownSeconds: 30,

    addVote: (playerId, vote) => {
      set((state) => {
        if (state.stage !== "voting") return;
        state.votes[playerId] = vote;
      });
    },

    callVote: (playerId) => {
      set((state) => {
        if (
          state.playersWhoCalledVote.includes(playerId) ||
          state.stage !== "waiting"
        ) {
          return;
        }

        state.initiatorId = playerId;
        state.playersWhoCalledVote = [...state.playersWhoCalledVote, playerId];
        state.votes = {};
      });
    },

    resetVote: () => {
      set((state) => {
        state.initiatorId = null;
        state.votes = {};
        state.countdownSeconds = 30;
      });
    },

    startWaiting: () => {
      set((state) => {
        state.stage = "waiting";
      });
    },

    startVoting: () => {
      set((state) => {
        state.stage = "voting";
      });
    },

    showResults: () => {
      set((state) => {
        state.stage = "results";
      });
    },

    decreaseCountdown: () =>
      set((state) => ({
        countdownSeconds: Math.max(0, state.countdownSeconds - 1),
      })),
  }))
);
