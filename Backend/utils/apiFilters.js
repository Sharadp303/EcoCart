function search(query, queryStr) {
    const keyword = queryStr.keyword
      ? {
          name: {
            $regex: queryStr.keyword,
            $options: "i",
          },
        }
      : {};
  
    return query.find({ ...keyword });
  }
  
  function filters(query, queryStr) {
    const { keyword, page, ...otherFilters } = queryStr;
  
    Object.entries(otherFilters).forEach(([key, value]) => {
        query = query.find({ [key]: { $regex: new RegExp(`^${value}$`, 'i') } });
    });
  
    return query;
  }
  
  function pagination(query, queryStr, resPerPage) {
    const currentPage = Number(queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
  
    return query.limit(resPerPage).skip(skip);
  }
  
  module.exports= { search, filters, pagination };
  