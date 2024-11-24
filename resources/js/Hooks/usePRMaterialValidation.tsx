import { useToast } from '@/Components/ui/use-toast';
import { IPRMaterial } from '@/types';

const MaterialValidationComponent = () => {
  const { toast } = useToast();

  const validateMaterials = (material: IPRMaterial[]) => {
    const dateToday = new Date();
    let isValid = true;
    const newErrors: string[] = [];
    const updatedMaterials = material
      .filter((item) => item.mat_code)
      .map((item, index) => ({ ...item, item_no: (index + 1) * 10 }));

    if (updatedMaterials.length === 0) {
      newErrors.push('Please add at least one item');
      isValid = false;
    }

    for (const updatedMaterial of updatedMaterials) {
      const { mat_code, qty, ord_unit, del_date, item_no } = updatedMaterial;

      if (mat_code) {
        if (!qty || qty <= 0) {
          newErrors.push(`Please enter quantity for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (!ord_unit) {
          newErrors.push(`Please enter order unit for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (!del_date) {
          newErrors.push(`Please enter delivery date for item no ${item_no}`);
          isValid = false;
          break;
        } else if (new Date(del_date).getTime() <= dateToday.getTime()) {
          newErrors.push(`Please enter a delivery date greater than today for item no ${item_no}`);
          isValid = false;
          break;
        }
      }
    }

    if (!isValid) {
      newErrors.forEach((error) => toast({ variant: 'destructive', description: error }));
    }

    return { isValid, updatedMaterials };
  };

  return { validateMaterials };
};

export default MaterialValidationComponent;
