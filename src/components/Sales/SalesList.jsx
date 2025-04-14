import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function SalesList({ sales, customers, products, stores, onEdit, onDelete }) {
  const getCustomerName = (id) => customers.find(c => c.id === id)?.name || id;
  const getProductName = (id) => products.find(p => p.id === id)?.name || id;
  const getStoreName = (id) => stores.find(s => s.id === id)?.name || id;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Store</TableCell>
            <TableCell>Date Sold</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{getCustomerName(sale.customerId)}</TableCell>
              <TableCell>{getProductName(sale.productId)}</TableCell>
              <TableCell>{getStoreName(sale.storeId)}</TableCell>
              <TableCell>{new Date(sale.dateSold).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(sale)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(sale.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}