import { IUom } from '@/types';

export const fetchUom = async (inputValue: string) => {
  if (!inputValue) return [];

  try {
    const response = await window.axios.get(route('uom.search', { search: inputValue }));

    return response.data.data.map((item: IUom) => ({
      value: item.uom,
      label: `${item.uom} - ${item.uom_text}`,
    }));
  } catch (e) {
    console.log('Error fetching data:', e);
    return [];
  }
};
