/**
 * useDirectusItems — Public, read-only Directus composable for the marketing site.
 * Fetches directly from the Directus REST API (no auth, public collections only).
 */

export interface ItemsQuery {
  fields?: string[];
  filter?: Record<string, any>;
  sort?: string[];
  limit?: number;
  offset?: number;
  search?: string;
  deep?: Record<string, any>;
}

function buildSearchParams(query: ItemsQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.fields?.length) {
    params.set('fields', query.fields.join(','));
  }
  if (query.filter) {
    params.set('filter', JSON.stringify(query.filter));
  }
  if (query.sort?.length) {
    params.set('sort', query.sort.join(','));
  }
  if (query.limit !== undefined) {
    params.set('limit', String(query.limit));
  }
  if (query.offset !== undefined) {
    params.set('offset', String(query.offset));
  }
  if (query.search) {
    params.set('search', query.search);
  }
  if (query.deep) {
    params.set('deep', JSON.stringify(query.deep));
  }

  return params;
}

export const useDirectusItems = <T = any>(collection: string) => {
  const config = useRuntimeConfig();
  const directusUrl = config.public.directusUrl || 'https://admin.earnest.guru';

  const list = async (query: ItemsQuery = {}): Promise<T[]> => {
    const params = buildSearchParams(query);
    const url = `${directusUrl}/items/${collection}?${params.toString()}`;
    const response = await $fetch<{ data: T[] }>(url);
    return response.data;
  };

  const get = async (id: string | number, query: Pick<ItemsQuery, 'fields' | 'deep'> = {}): Promise<T> => {
    const params = buildSearchParams(query);
    const url = `${directusUrl}/items/${collection}/${id}?${params.toString()}`;
    const response = await $fetch<{ data: T }>(url);
    return response.data;
  };

  return { list, get };
};
