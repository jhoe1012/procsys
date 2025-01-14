import { IMaterial } from '@/types';

export const fetchMaterial = async (inputValue: string) => {
  if (!inputValue) return [];

  try {
    const response = await window.axios.get(route('material.search', { search: inputValue }));

    return response.data.data.map((item: IMaterial) => ({
      value: item.mat_code,
      label: `${item.mat_code} - ${item.mat_desc}`,
    }));
  } catch (e) {
    console.log('Error fetching data:', e);
    return [];
  }
};
