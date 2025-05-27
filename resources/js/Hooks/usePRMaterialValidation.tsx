import { useToast } from '@/Components/ui/use-toast';
import { Choice, IPRMaterial } from '@/types';

const usePRMaterialValidation = () => {
  const { toast } = useToast();

  const validateMaterials = (material: IPRMaterial[], materialGeneric: string[], prCtrlGrpChoice: Choice[]) => {
    const dateToday = new Date();
    let isValid = true;
    const newErrors: string[] = [];
    const updatedMaterials = material.filter((item) => item.mat_code).map((item, index) => ({ ...item, item_no: (index + 1) * 10 }));
    const PrCtrlGrp = new Set(updatedMaterials.map((item) => item.prctrl_grp_id));
    const prCtrlGrpValue = new Set(prCtrlGrpChoice.map((choice) => parseInt(choice.value)));

    if (updatedMaterials.length === 0) {
      newErrors.push('Please add at least one item');
      isValid = false;
    }

    if (PrCtrlGrp.size !== 1) {
      newErrors.push('Ensure that the PR Controller remains the same for all line items.');
      isValid = false;
    }

    for (const updatedMaterial of updatedMaterials) {
      const { mat_code, qty, ord_unit, del_date, item_no, price, per_unit, item_text, prctrl_grp_id  , status} = updatedMaterial;
      
      if (mat_code) {
        if (!qty || qty <= 0) {
          newErrors.push(`Please enter quantity for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (!price || price <= 0) {
          newErrors.push(`Please enter price for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (!per_unit || per_unit <= 0) {
          newErrors.push(`Please enter per unit for item no ${item_no}`);
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
        } else if (new Date(del_date).getTime() <= dateToday.getTime() && status === null) {
          newErrors.push(`Please enter a delivery date greater than today for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (mat_code && materialGeneric.includes(mat_code) && !item_text) {
          newErrors.push(`Please enter item text for item no ${item_no}`);
          isValid = false;
          break;
        }

        if (!prctrl_grp_id || !prCtrlGrpValue.has(prctrl_grp_id)) {
          newErrors.push(`Please enter PR Controller  ${item_no}`);
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

export default usePRMaterialValidation;
