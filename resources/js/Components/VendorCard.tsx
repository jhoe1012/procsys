import { IVendor } from '@/types';
import { Card, CardContent, Table, TableBody, TableCell, TableRow } from '@/Components/ui';

interface VendorCardProps {
  vendor?: IVendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  if (!vendor) return null;

  return (
    <Card>
      <CardContent>
        <Table className="w-11/2 text-sm">
          <TableBody>
            <TableRow className="border-none">
              <TableCell>
                <b>Account group: </b>
              </TableCell>
              <TableCell>{vendor.account_group}</TableCell>
              <TableCell>
                <b>Name: </b>
              </TableCell>
              <TableCell>{[vendor.name_1, vendor.name_2, vendor.name_3, vendor.name_4].filter(Boolean).join(' ')}</TableCell>
              <TableCell>
                <b>Supplier: </b>
              </TableCell>
              <TableCell>{vendor.supplier}</TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell>
                <b>Address: </b>
              </TableCell>
              <TableCell>
                {[vendor.street, vendor.district, vendor.city, vendor.postal_code, vendor.country].filter(Boolean).join(' ')}
              </TableCell>
              <TableCell>
                <b>Tax Number: </b>
              </TableCell>
              <TableCell>{[vendor.tax_number, vendor.tax_number_2].filter(Boolean).join(' ')}</TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell>
                <b>Telephone 1: </b>
              </TableCell>
              <TableCell>{vendor.telephone_1 || 'N/A'}</TableCell>
              <TableCell>
                <b>Telephone 2: </b>
              </TableCell>
              <TableCell>{vendor.telephone_2 || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
