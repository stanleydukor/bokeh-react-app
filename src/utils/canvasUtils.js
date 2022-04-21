import { solveCubic } from "./calculation";

export const canvasToImage = canvas => {
  if (canvas) return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  return null;
};

export const downloadCanvas = (canvas, fileName) => {
  if (canvas) {
    let image = canvasToImage(canvas);
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.href = image;
    downloadLink.click();
  }
};

export const canvasResize = (oldCanvas, size = 1000) => {
  if (oldCanvas) {
    const maxi = Math.max(oldCanvas.width, oldCanvas.height);
    const ratio = maxi / size;
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");
    newCanvas.width = oldCanvas.width / ratio;
    newCanvas.height = oldCanvas.height / ratio;
    context.drawImage(oldCanvas, 0, 0, oldCanvas.width, oldCanvas.height, 0, 0, newCanvas.width, newCanvas.height);
    return newCanvas;
  }
  return null;
};

export const cloneCanvas = oldCanvas => {
  if (oldCanvas) {
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    context.drawImage(oldCanvas, 0, 0);
    return newCanvas;
  }
  return null;
};

export const canvasLike = canvas => {
  if (canvas) {
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    return newCanvas;
  }
  return null;
};

export const dimensionToBox = dimension => {
  let x = dimension[0];
  let y = dimension[1];
  let w = dimension[2] - x;
  let h = dimension[3] - y;
  if (w === 0 || h === 0) {
    return null;
  }
  return [x, y, w, h];
};

export const boxToDimension = box => {
  let x1 = box[0];
  let y1 = box[1];
  let x2 = x1 + box[2];
  let y2 = y1 + box[3];
  return [x1, y1, x2, y2];
};

export const getRatio = (image, canvas) => {
  let hRatio = canvas.width / image.width;
  let vRatio = canvas.height / image.height;
  let ratio = Math.min(hRatio, vRatio);
  let centerShift_x = (canvas.width - image.width * ratio) / 2;
  let centerShift_y = (canvas.height - image.height * ratio) / 2;
  return {
    ratio: ratio,
    centerShift_x: centerShift_x,
    centerShift_y: centerShift_y
  };
};

export const upScaleBox = (box, ratio, centerShift_x, centerShift_y, translatePos, scale) => {
  let x = (box[0] - centerShift_x - translatePos.x) / ratio / scale;
  let y = (box[1] - centerShift_y - translatePos.y) / ratio / scale;
  let w = box[2] / ratio / scale;
  let h = box[3] / ratio / scale;
  return [x, y, w, h];
};

export const upScaleDimension = (dimension, ratio, centerShift_x, centerShift_y, translatePos, scale) => {
  let x1 = (dimension[0] - centerShift_x - translatePos.x) / ratio / scale;
  let y1 = (dimension[1] - centerShift_y - translatePos.y) / ratio / scale;
  let x2 = x1 + (dimension[2] - centerShift_x) / ratio / scale;
  let y2 = y1 + (dimension[3] - centerShift_y) / ratio / scale;
  return [x1, y1, x2, y2];
};

export const downScaleBox = (box, ratio, centerShift_x, centerShift_y, translatePos, scale) => {
  let x = box[0] * ratio * scale + centerShift_x + translatePos.x;
  let y = box[1] * ratio * scale + centerShift_y + translatePos.y;
  let w = box[2] * ratio * scale;
  let h = box[3] * ratio * scale;
  return [x, y, w, h];
};

export const upScalePoint = (point, ratio, centerShift_x, centerShift_y, translatePos, scale) => {
  let { x, y } = point;
  let new_x = (x - centerShift_x - translatePos.x) / ratio / scale;
  let new_y = (y - centerShift_y - translatePos.y) / ratio / scale;
  return { x: new_x, y: new_y };
};

export const downScalePoint = (point, ratio, centerShift_x, centerShift_y, translatePos, scale) => {
  let { x, y } = point;
  let new_x = x * ratio * scale + centerShift_x + translatePos.x;
  let new_y = y * ratio * scale + centerShift_y + translatePos.y;
  return { x: new_x, y: new_y };
};

export const getDimension = (image, ratio, centerShift_x, centerShift_y, translatePos, scale) => {
  let x1 = centerShift_x + translatePos.x;
  let y1 = centerShift_y + translatePos.y;
  let x2 = x1 + image.width * ratio * scale;
  let y2 = y1 + image.height * ratio * scale;
  return [x1, y1, x2, y2];
};

export const getBoundingArea = image => {
  if (image) {
    return [0, 0, image.width, image.height];
  }
  return null;
};

export const drawCanvasImage = (image, context) => {
  context.drawImage(image, 0, 0);
};

export const drawNewCanvasImage = (image, context, canvas) => {
  context.drawImage(canvas, 0, 0);
};

export const drawScaledCanvasImage = (image, canvas, ratio, centerShift_x, centerShift_y, scale, translatePos) => {
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(translatePos.x, translatePos.y);
  context.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    centerShift_x,
    centerShift_y,
    image.width * ratio * scale,
    image.height * ratio * scale
  );
  context.restore();
};

export const getImageFromCanvas = bitmap => {
  let canvas = document.createElement("canvas");
  canvas.width = 190;
  canvas.height = 132;
  let { ratio, centerShift_x, centerShift_y } = getRatio(bitmap, canvas);
  drawScaledCanvasImage(bitmap, canvas, ratio, centerShift_x, centerShift_y, 1, { x: 0, y: 0 });
  return canvasToImage(canvas);
};

export const drawBox = (canvas, box) => {
  const [new_x, new_y, new_w, new_h] = box;
  const context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "red";
  context.rect(new_x, new_y, new_w, new_h);
  context.stroke();
};
