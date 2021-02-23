import "./component";

interface HTMLWorksElement extends HTMLElement {
  isOpen: boolean;
  onClose: () => void;
}

const toggle = () => {
  const comp = document.querySelector("wlb-works") as HTMLWorksElement;
  if (comp === null) {
    return;
  }

  comp.isOpen = comp.isOpen ? false : true;
};

(document.querySelector("wlb-works") as HTMLWorksElement).onClose = toggle;
(document.querySelector(
  "button#toggle-button"
) as HTMLButtonElement).onclick = toggle;
