const API_URL = "http://localhost:3000/devs";

export const DevService = {
  listar: async () => {
    const response = await fetch(API_URL);
    return response.json();
  },

  criar: async (dev: { name: string }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dev),
    });
    return response.json();
  },

  atualizar: async (id: number, dev: { name: string }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dev),
    });
    return response.json();
  },

  deletar: async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};