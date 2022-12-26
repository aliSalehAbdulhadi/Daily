export let times: any = [];
// return 24 hours with quarters
for (let i = 0; i < 24; i++) {
  for (let y = 0; y <= 45; y = y + 15) {
    times.push(String(`${i < 10 ? '0' + i : i}:${y > 0 ? y : '0' + y}`));
  }
}
