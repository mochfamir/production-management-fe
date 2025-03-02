import dayjs from "dayjs";
import axiosInstance from "../utils/axios";
import { DataProvider } from "@refinedev/core";
import { convertFiltersToQueryString } from "../utils/filter-to-query";

const API_URL = "http://localhost:3000"; // URL backend Nest.js

export const dataProvider: DataProvider = {
  getApiUrl: () => API_URL,

  getList: async ({ resource, pagination, filters, sorters }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    const query = {
      page: current,
      limit: pageSize,

      ...(filters?.length && { filters: convertFiltersToQueryString(filters) }),
      ...(sorters && { sorters }),
    };

    const response = await axiosInstance.get(`${API_URL}/${resource}`, {
      params: query,
    });

    return {
      data: response.data.data,
      total: response.data.total,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await axiosInstance.get(`${API_URL}/${resource}/${id}`);
    return {
      data: { ...response.data, dueDate: dayjs(response.data.dueDate) },
    };
  },

  create: async ({ resource, variables }) => {
    const response = await axiosInstance.post(
      `${API_URL}/${resource}`,
      variables
    );
    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const isManager = localStorage.getItem("role") === "MANAGER";

    const url = isManager
      ? `${API_URL}/${resource}/${id}`
      : `${API_URL}/${resource}/${id}/status`;
    const response = await axiosInstance.patch(url, variables);
    return {
      data: response.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await axiosInstance.delete(`${API_URL}/${resource}/${id}`);
    return {
      data: response.data,
    };
  },
};
