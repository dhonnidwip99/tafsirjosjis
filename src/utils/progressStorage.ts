/**
 * Logic for calculating progress, quiz grades, and managing local storage state.
 */

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
}

export interface ProgressState {
  completedTopics: string[]; // array of topic or verse IDs
  quizScores: Record<string, QuizResult>; // moduleId -> QuizResult
  masteredFlashcards: string[]; // flashcard IDs marked as understood
}

export const INITIAL_PROGRESS: ProgressState = {
  completedTopics: [],
  quizScores: {},
  masteredFlashcards: [],
};

const STORAGE_KEY = 'tafsirpedia_progress_v1';

export function calculateProgressPercentage(
  completedCount: number,
  totalCount: number
): number {
  if (totalCount <= 0) return 0;
  const pct = Math.round((completedCount / totalCount) * 100);
  return Math.min(100, Math.max(0, pct));
}

export function evaluateQuizPerformance(percentage: number): {
  grade: 'Mumtaz' | 'Jayyid Jiddan' | 'Jayyid' | 'Maqbul' | 'Rasib';
  message: string;
  passed: boolean;
} {
  if (percentage >= 90) {
    return {
      grade: 'Mumtaz',
      message: 'Istimewa! Pemahaman Anda terhadap materi tafsir ini sangat mendalam.',
      passed: true,
    };
  }
  if (percentage >= 80) {
    return {
      grade: 'Jayyid Jiddan',
      message: 'Sangat Baik! Anda menguasai pokok-pokok bahasan dan kaidah tafsir dengan baik.',
      passed: true,
    };
  }
  if (percentage >= 70) {
    return {
      grade: 'Jayyid',
      message: 'Baik! Sebagian besar konsep telah dipahami. Ulas kembali poin-poin yang belum tepat.',
      passed: true,
    };
  }
  if (percentage >= 60) {
    return {
      grade: 'Maqbul',
      message: 'Cukup. Disarankan membaca ulang penjelasan tafsir dan asbabun nuzul untuk memantapkan pemahaman.',
      passed: true,
    };
  }
  return {
    grade: 'Rasib',
    message: 'Perlu Pengulangan. Jangan berkecil hati, pelajari kembali materi modul dan coba kuis lagi.',
    passed: false,
  };
}

export function loadProgress(): ProgressState {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch {
    // fallback to initial state on storage error
  }
  return { ...INITIAL_PROGRESS };
}

export function saveProgress(state: ProgressState): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // ignore local storage quota / sandbox error
  }
}

export function toggleTopicCompletion(
  currentList: string[],
  topicId: string
): string[] {
  if (currentList.includes(topicId)) {
    return currentList.filter((id) => id !== topicId);
  }
  return [...currentList, topicId];
}

export function toggleFlashcardMastery(
  currentList: string[],
  cardId: string
): string[] {
  if (currentList.includes(cardId)) {
    return currentList.filter((id) => id !== cardId);
  }
  return [...currentList, cardId];
}
