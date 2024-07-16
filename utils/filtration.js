import Category from '../model/category.js';

export const  buildFilterQuery = async (baseQuery, filters) => {
    const query = { ...baseQuery };
  
    if (filters.category) {
      const category = await Category.findOne({ name: filters.category, user: filters.userId });

      if (category) {
        query.category = category._id;
      } else {
        // If no matching category is found, return empty result
        return res.json({
          tasks: [],
          currentPage: parseInt(page),
          totalPages: 0,
          totalTasks: 0
        });
      }
    }
  
    if (filters.shared !== undefined) {
      query.shared = filters.shared === 'true';
    }
  
    return query;
  };