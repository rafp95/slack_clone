export enum CustomEvents {
  new_message = "new_message",
}

export const addEvent = (customEvent: CustomEvents, fn: any) => {
  window.addEventListener(customEvent, fn);
};

export const removeEvent = (customEvent: CustomEvents, fn: any) => {
  window.removeEventListener(customEvent, fn);
};

export const dispatchEvent = (customEvent: CustomEvents, data: any) => {
  window.dispatchEvent(
    new CustomEvent(customEvent, {
      detail: data,
    })
  );
};
