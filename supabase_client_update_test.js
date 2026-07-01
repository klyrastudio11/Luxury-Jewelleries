const { createClient } = require('@supabase/supabase-js');
const url = 'https://forizjrhqwbssigqzsrs.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcml6anJocXdic3NpZ3F6c3JzIiwicm9zZSIsInJlZiI6ImFub24iLCJpYXQiOjE3ODI3MzI2NDcsImV4cCI6MjA5ODMwODY0N30.0B1ocn5BRSWcDKq00Xp8k_iYxETUyB5byI8dNC9bPEI';
const supabase = createClient(url, key);

(async () => {
  const { data: orders, error: selectError } = await supabase.from('orders').select('id,status,total').limit(1);
  console.log('selectError', selectError);
  console.log('orders', orders);
  if (!orders || !orders.length) return;
  const id = orders[0].id;
  console.log('testing id', id);

  const { data: updateStatus, error: statusError } = await supabase.from('orders').update({ status: 'Confirmed' }).eq('id', id).select('id,status');
  console.log('statusError', statusError);
  console.log('statusData', updateStatus);

  const { data: updateTotal, error: totalError } = await supabase.from('orders').update({ total: orders[0].total + 1 }).eq('id', id).select('id,status,total');
  console.log('totalError', totalError);
  console.log('totalData', updateTotal);
})();
