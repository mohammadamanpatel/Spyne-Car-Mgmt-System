const BASE_URL = "/api/car";

export const fetchUserCars = async (token) => {
  const response = await fetch(`${BASE_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
export const fetchAllCars = async () => {
  const response = await fetch(`${BASE_URL}/getAllCars`);
  console.log("response",response)
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
};


export const fetchCarById = async (id, token) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const createCar = async (data, token) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data, // FormData for file upload
  });
  return response.json();
};

export const updateCar = async (id, data, token) => {
  console.log("id, data, token in updateCar",id, data, token)
  const response = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: data, // FormData for file upload
  });
  return response.json();
};

export const deleteCar = async (id, token) => {
  const response = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
export const searchCars = async (keyword) => {
  try {
    const response = await fetch(`${BASE_URL}/search?keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the token in localStorage
      },
    });
    console.log("response",response)
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    const cars = await response.json();
    console.log("cars",cars)
    return cars;
  } catch (error) {
    return { error: error.message };
  }
};
