import API from "./api";

// Get all institutions
export const getAllInstitutions = async () => {
  const res = await API.get("/institutions");
  return res.data;
};

// Create institution
export const createInstitution = async (data) => {
  const res = await API.post("/institutions", data);
  return res.data;
};

// Enable / Disable institution
export const toggleInstitutionStatus = async (id, status) => {
  const res = await API.patch(`/institutions/${id}/status`, {
    status
  });
  return res.data;
};
