export async function createKey(ip: string, session: string): Promise<string | undefined> {
  const data = {
    name: ip,
    description: `API Key for IP ${ip}`,
    cidrRanges: [ip],
    scopes: null,
  };
  const response = await fetch('https://developer.clashofclans.com/api/apikey/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie:
        'session=s%3Aj%3A%7B%22expires%22%3A1685545571800%2C%22uid%22%3A%221d08707f-4f21-dcf9-4437-8e51eb42f649%22%2C%22token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJqdGkiOiJkNGQ5ZTUzZC02ZjVkLTg0YTYtNzA5ZC00MzMyZjhhYjE3ZjUiLCJzdWIiOiIxZDA4NzA3Zi00ZjIxLWRjZjktNDQzNy04ZTUxZWI0MmY2NDkiLCJleHAiOjE2ODU1NDU1NzIsImdhbWUiOiJjbGFzaCIsInJvbGUiOiJkZXZlbG9wZXIifQ.pwTqKZJSEvxUYw_kOLUb1d9sn8B15dlNO0IYq9bvSSMSBBDK3L6ul55KokPwKerWfsBp-nEburtWaCUt8xkr-g%22%7D.697fsdmJCE0J90%2F3dQpdKm1CC0Oo%2FDmgi1YAyLIx%2FSY',
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json['ip'];
  }
  return undefined;
}
