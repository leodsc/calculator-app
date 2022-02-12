export const preventDoubleClick = (target) => {
  target.setAttribute("disabled", true);
  setTimeout(() => {
    target.removeAttribute("disabled");
  }, 40)
}