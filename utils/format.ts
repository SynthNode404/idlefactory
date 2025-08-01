export const formatNumber = (num: number): string => {
  if (num < 1000) {
    const fixed = num.toFixed(1);
    if (fixed.endsWith('.0')) return num.toFixed(0);
    return fixed;
  }
  const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi"];
  const i = Math.floor(Math.log10(num) / 3);
  if (i >= suffixes.length) {
    return num.toExponential(2);
  }
  const scaledNum = num / Math.pow(1000, i);
  return `${scaledNum.toFixed(2)}${suffixes[i]}`;
};

export const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
}
