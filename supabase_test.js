const fetch = globalThis.fetch || require('node-fetch');
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcml6anJocXdic3NpZ3F6c3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzI2NDcsImV4cCI6MjA5ODMwODY0N30.0B1ocn5BRSWcDKq00Xp8k_iYxETUyB5byI8dNC9bPEI';
const id = '2ddab3e5-3170-421b-a5b4-52b5d96c81d8';
const url = `https://forizjrhqwbssigqzsrs.supabase.co/rest/v1/orders?id=eq.${encodeURIComponent(id)}`;
(async () => {
  try {
    const before = await fetch(url, { headers: { Authorization: `Bearer ${key}`, apikey: key, 'Accept': 'application/json' } });
    console.log('before status', before.status);
    console.log('before body', await before.text());
    const patch = await fetch(url, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${key}`, apikey: key, 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Confirmed' })
    });
    console.log('patch status', patch.status);
    console.log('patch body', await patch.text());
    const after = await fetch(url, { headers: { Authorization: `Bearer ${key}`, apikey: key, 'Accept': 'application/json' } });
    console.log('after status', after.status);
    console.log('after body', await after.text());
  } catch (err) {
    console.error(err);
  }
})();
