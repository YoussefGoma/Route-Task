export const paginateResults = (page, limit) => {
    const options = {
      limit: parseInt(limit) || 10,
      skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    };
    return options;
  };
  
  export const formatPaginatedResponse = (results, total, page, limit) => {
    return {
      results,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page) || 1,
      totalResults: total,
    };
  };

  