export function convertFiltersToQueryString(filters: any[]): string {
  const queryParams: string[] = [];

  filters.forEach((filter) => {
    const { field, operator, value } = filter;

    if (field && value !== undefined) {
      let queryParam = "";
      switch (operator) {
        case "eq":
          queryParam = `${field}=${encodeURIComponent(value)}`;
          break;
        case "neq":
          queryParam = `${field}[neq]=${encodeURIComponent(value)}`;
          break;
        case "gt":
          queryParam = `${field}[gt]=${encodeURIComponent(value)}`;
          break;
        case "lt":
          queryParam = `${field}[lt]=${encodeURIComponent(value)}`;
          break;
        default:
          queryParam = `${field}=${encodeURIComponent(value)}`;
      }

      queryParams.push(queryParam);
    }
  });

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
}
