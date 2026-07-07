export default function timeAgo(dateStr) {
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now - past;

  if (isNaN(past.getTime())) return "–";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (seconds < 60)  return "Just now";
  if (minutes < 60)  return `${minutes} Minute ago`;
  if (hours < 24)    return `${hours} hours ago`;
  if (days === 1)    return "Yesterday";
  if (days < 7)      return `${days} days ago`;
  if (weeks < 4)     return `${weeks} weeks ago`;
  if (months < 12)   return `${months} months ago`;
  return `${years} years ago`;
}