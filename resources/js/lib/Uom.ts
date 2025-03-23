import { IUom } from '@/types';

export const fetchUom = async (inputValue: string) => {
  if (!inputValue) return [];

  try {
    const response = await window.axios.get(route('uom.search', { search: inputValue }));

    return response.data.data.map((uom: IUom) => ({
      value: uom.uom,
      label: `${uom.uom} - ${uom.uom_text}`,
    }));
  } catch (e) {
    console.log('Error fetching data:', e);
    return [];
  }
};
