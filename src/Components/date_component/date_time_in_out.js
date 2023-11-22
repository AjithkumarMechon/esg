export function UpdateLastLogin() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  localStorage.setItem("entryLogin", formattedDate);
}

export function UpdateLastLogout() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  localStorage.setItem("lastLogout", formattedDate);
}
