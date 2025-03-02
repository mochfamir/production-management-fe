export function nextStatus(status: string) {
  return status === "PENDING"
    ? "IN_PROGRESS"
    : status === "IN_PROGRESS"
    ? "COMPLETED"
    : "PENDING";
}
