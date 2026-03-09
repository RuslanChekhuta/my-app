const getClientCoordinates = (event) => {
  if (!event) {
    return null;
  }

  if ("touches" in event && event.touches.length > 0) {
    const touch = event.touches[0];
    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  if ("changedTouches" in event && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0];
    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  if ("clientX" in event && "clientY" in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  return null;
};

const isTouchActivator = (event) => {
  if (!event) {
    return false;
  }

  return (
    ("touches" in event && event.touches.length > 0) ||
    ("changedTouches" in event && event.changedTouches.length > 0) ||
    ("pointerType" in event && event.pointerType === "touch")
  );
};

export const snapDragOverlayToPointer = ({
  activatorEvent,
  activeNodeRect,
  draggingNodeRect,
  overlayNodeRect,
  transform,
}) => {
  const coordinates = getClientCoordinates(activatorEvent);
  const referenceRect = activeNodeRect ?? draggingNodeRect ?? overlayNodeRect;

  if (!coordinates || !referenceRect || !overlayNodeRect) {
    return transform;
  }

  const touchDrag = isTouchActivator(activatorEvent);
  const initialPointerOffsetX = coordinates.x - referenceRect.left;
  const initialPointerOffsetY = coordinates.y - referenceRect.top;
  const targetPointerOffsetX = touchDrag
    ? overlayNodeRect.width * 0.5
    : Math.min(overlayNodeRect.width * 0.34, 120);
  const targetPointerOffsetY = touchDrag
    ? Math.min(overlayNodeRect.height * 0.18, 44)
    : Math.min(overlayNodeRect.height * 0.2, 36);

  return {
    ...transform,
    x: transform.x + initialPointerOffsetX - targetPointerOffsetX,
    y: transform.y + initialPointerOffsetY - targetPointerOffsetY,
  };
};
