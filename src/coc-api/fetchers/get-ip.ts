export async function getIp(): Promise<string | undefined> {
  const response = await fetch('https://api.myip.com');
  if (response.ok) {
    const json = await response.json();
    return json['ip'];
  }
  return undefined;
}
