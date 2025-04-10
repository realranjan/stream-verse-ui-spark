import { useState, useEffect } from 'react';

/**
 * Custom hook that returns a boolean indicating whether the specified media query matches
 * @param query The media query to check
 * @returns A boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with the match state
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // If window is not defined, return early
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Update the state initially
    setMatches(mediaQuery.matches);

    // Define a listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    mediaQuery.addEventListener('change', listener);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]); // Re-run if the query changes

  return matches;
}

export default useMediaQuery; 