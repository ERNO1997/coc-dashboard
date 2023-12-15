export async function createKey(ip: string, key: string) {
  fetch('https://coc-dashboard-a28ce-default-rtdb.firebaseio.com/keys.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(key),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(reason => {
      console.log(reason);
    });
}
