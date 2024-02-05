import type { Crumb } from '$lib/types';
import { writable } from 'svelte/store';


// Initial breadcrumb value
const initialBreadcrumbs: Crumb[] = [];

// Create a writable store for breadcrumbs
export const breadcrumbs = writable(initialBreadcrumbs);

// Function to update the breadcrumbs
export function setBreadcrumbs(newBreadcrumbs: Crumb[]) {
  breadcrumbs.set(newBreadcrumbs);
}
