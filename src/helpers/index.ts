
// Helper function to check for banned words
export const containsBannedWords = (
    value: string,
    bannedWords?: string[]
  ): boolean => {
    if (!bannedWords || bannedWords.length === 0) return false;
    return bannedWords.some((word) =>
      value.toLowerCase().includes(word.toLowerCase())
    );
  };