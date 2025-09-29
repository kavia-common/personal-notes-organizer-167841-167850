import AsyncStorage from '@react-native-async-storage/async-storage';

const NS = 'notes_app';

function key(name: string) {
  return `${NS}:${name}`;
}

// PUBLIC_INTERFACE
export async function saveJSON<T>(name: string, data: T): Promise<void> {
  /** Save any JSON-serializable object under a namespaced key. */
  await AsyncStorage.setItem(key(name), JSON.stringify(data));
}

// PUBLIC_INTERFACE
export async function loadJSON<T>(name: string, fallback: T): Promise<T> {
  /** Load JSON by key. Returns fallback if not found or invalid. */
  try {
    const raw = await AsyncStorage.getItem(key(name));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export async function removeKey(name: string): Promise<void> {
  /** Remove a namespaced key from storage. */
  await AsyncStorage.removeItem(key(name));
}
