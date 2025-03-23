import { useToast } from '@/Components/ui/use-toast';
import { IPOMaterial, IPRMaterial } from '@/types';

const usePOMaterialValidation = () => {
  const { toast } = useToast();

  const validateMaterials = (material: IPOMaterial[]) => {
    const dateToday = new Date();
    let isValid = true;
    const newErrors: string[] = [];
    const updatedMaterials = material.filter((item) => item.mat_code).map((item, index) => ({ ...item, item_no: (index + 1) * 10 }));

    if (updatedMaterials.length === 0) {
      newErrors.push('Please add at least one item ');
      isValid = false;
    }

    for (const updatedMaterial of updatedMaterials) {
      const { mat_code, po_qty, del_date, unit, item_no } = updatedMaterial;

      if (mat_code) {
        if (!po_qty || po_qty <= 0) {
          newErrors.push(`Please enter quantity for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (!unit) {
          newErrors.push(`Please enter order unit for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (!del_date) {
          newErrors.push(`Please enter delivery date for item no ${item_no}`);
          isValid = false;
          break;
        }
        // else if (new Date(del_date).getTime() <= dateToday.getTime()) {
        //   newErrors.push(`Please enter a delivery date greater than today for item no ${item_no}`);
        //   isValid = false;
        //   break;
        // }
      }
    }

    if (!isValid) {
      newErrors.forEach((error) => toast({ variant: 'destructive', description: error }));
    }

    return { isValid, updatedMaterials };
  };

  return { validateMaterials };
};

export default usePOMaterialValidation;
