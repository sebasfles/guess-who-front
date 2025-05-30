import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Challenge, generateChallenges } from "@/models/challenge";

interface GameState {
  currentDay: number;
  totalDays: number;
  status: "lobby" | "gameplay" | "over";
  dayStage: "challenge" | "vote";
  challenges: Challenge[];
  discussionTime: number;
  proposalTime: number;
  votingTime: number;
}

interface GameActions {
  // Dev tools actions
  goToFirstDay: () => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;

  startGame: () => void;
  endGame: () => void;
  setDiscussionTime: (time: number) => void;
  setProposalTime: (time: number) => void;
  setVotingTime: (time: number) => void;
}

export const useGame = create<GameState & GameActions>()(
  immer((set) => ({
    currentDay: 1,
    totalDays: 10,
    challenges: generateChallenges(),
    status: "lobby",
    dayStage: "challenge",
    discussionTime: 40,
    proposalTime: 40,
    votingTime: 40,

    goToFirstDay: () => {
      set((state) => {
        state.currentDay = 1;
      });
    },

    goToNextDay: () => {
      set((state) => {
        if (state.currentDay === state.totalDays) return;
        state.currentDay += 1;
      });
    },

    goToPreviousDay: () => {
      set((state) => {
        if (state.currentDay === 1) return;
        state.currentDay -= 1;
      });
    },

    startGame: () => {
      set((state) => {
        state.status = "gameplay";
      });
    },

    endGame: () => {
      set((state) => {
        state.status = "over";
      });
    },

    setDiscussionTime: (time: number) => {
      set((state) => {
        state.discussionTime = time;
      });
    },

    setProposalTime: (time: number) => {
      set((state) => {
        state.proposalTime = time;
      });
    },

    setVotingTime: (time: number) => {
      set((state) => {
        state.votingTime = time;
      });
    },
  }))
);
