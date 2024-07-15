export const buildFilterQuery = (baseQuery, filters) => {
    const query = { ...baseQuery };
  
    if (filters.category) {
      query.category = filters.category;
    }
  
    if (filters.shared !== undefined) {
      query.shared = filters.shared === 'true';
    }
  
    return query;
  };
  
  export const applySorting = (sortField) => {
    return sortField ? { [sortField]: 1 } : undefined;
  };