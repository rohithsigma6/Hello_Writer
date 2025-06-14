import { SidebarOptions } from "@/store/editor/slices/editor";

/**
 * Toggles a key/value pair in URL search parameters.
 * If the key already has the provided value, it will be removed;
 * otherwise, the key is set to the provided value.
 *
 * @param {URLSearchParams} searchParams - The URLSearchParams instance.
 * @param {string} key - The key to toggle.
 * @param {string} value - The value to set for toggling.
 * @returns {Object} - A new object representing the updated search parameters.
 */
export function toggleSearchParam(searchParams: URLSearchParams, key: string, value: string) {
  const currentParams = Object.fromEntries(searchParams.entries());

  // If the parameter is already set to the provided value, remove it.
  if (searchParams.get(key) === value) {
    const { [key]: _, ...restParams } = currentParams;
    return restParams;
  }

  // Otherwise, add/update the key with the provided value.
  return { ...currentParams, [key]: value };
}
