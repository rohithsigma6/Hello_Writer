import {
  ELEMENT_CLASSNAMES,
  ONE_EIGHTH_OF_PAGE,
  PAGE_BREAK_COUNT,
  SceneTimes,
} from '@screenplay-ink/editor';
import { Editor } from '@tiptap/react';

export function getComputedStyleInPx(node: any, style: string) {
  return Math.round(
    parseFloat(getComputedStyle(node).getPropertyValue(style)) || 0,
  );
}

export function convertToMixedFraction(numerator: number, denominator: number) {
  if (denominator === 0) {
    throw new Error('Denominator cannot be zero.');
  }

  const wholeNumber = Math.floor(numerator / denominator);
  const newNumerator = numerator % denominator;

  if (newNumerator === 0) {
    return `${wholeNumber}`;
  } else {
    return `${wholeNumber !== 0 ? `${wholeNumber} ` : ''}${Math.abs(newNumerator)}/${Math.abs(denominator)}`;
  }
}

export function calculateTotalPagesFromScenes(height: number) {
  const numerator = Math.ceil(height / ONE_EIGHTH_OF_PAGE);
  const denominator = PAGE_BREAK_COUNT;

  if (denominator === 0) {
    throw new Error('Denominator cannot be zero.');
  }

  const wholeNumber = Math.floor(numerator / denominator);
  const newNumerator = numerator % denominator;

  if (newNumerator === 0) {
    return wholeNumber;
  } else {
    if (wholeNumber !== 0) {
      return wholeNumber;
    } else {
      return Math.abs(newNumerator) / Math.abs(denominator);
    }
  }
}

export function getTotalHeightOfScenes(editor: Editor, nodeType: string) {
  // Find all nodes of the specified type
  const nodes = editor.view.dom.querySelectorAll(nodeType);
  const sceneHeightArr = [];

  // Sum the heights of these nodes
  let totalHeight = 0;
  nodes.forEach((node, idx) => {
    if (node.className === ELEMENT_CLASSNAMES.SCENE && totalHeight > 0) {
      sceneHeightArr.push(totalHeight);
      totalHeight = 0;
    }

    const rect = node.getBoundingClientRect();
    if (idx === 0) {
      totalHeight += 96;
    }
    if (idx === nodes.length - 1) {
      totalHeight +=
        rect.height +
        getComputedStyleInPx(node, 'margin-top') +
        getComputedStyleInPx(node, 'padding-top');
    } else {
      totalHeight +=
        rect.height +
        getComputedStyleInPx(node, 'margin-top') +
        getComputedStyleInPx(node, 'margin-bottom') +
        getComputedStyleInPx(node, 'padding-top') +
        getComputedStyleInPx(node, 'padding-bottom');
    }
  });

  if (totalHeight > 0) sceneHeightArr.push(totalHeight);

  return { sceneHeightArr };
}

// Scene Location Indicator Type
const scenesIndicator = {
  internal: 'INT',
  external: 'EXT',
  internalExternal: 'I/E',
  externalInternal: 'E/I',
};
export const timeIndicator = {
  day: 'DAY',
  night: 'NIGHT',
  afternoon: 'AFTERNOON',
  morning: 'MORNING',
  evening: 'EVENING',
  momentsLater: 'MOMENTS LATER',
  continuous: 'CONTINUOUS',
  sunrise: 'SUNRISE',
  sundown: 'SUNDOWN',
  magicHour: 'MAGIC HOUR',
};

// Handle Internal Scene
const handleInternalScene = (text: string) => {
  if (text.toUpperCase().endsWith(timeIndicator.day)) {
    return 'bg-[#ADD9F6]';
  } else if (text.toUpperCase().endsWith(timeIndicator.night)) {
    return 'bg-[#5B7A9E]';
  } else if (text.toUpperCase().endsWith(timeIndicator.afternoon)) {
    return 'bg-[#7DC2EB]';
  } else if (text.toUpperCase().endsWith(timeIndicator.morning)) {
    return 'bg-[#91CFF2]';
  } else if (text.toUpperCase().endsWith(timeIndicator.evening)) {
    return 'bg-[#A0C0DE]';
  } else if (text.toUpperCase().endsWith(timeIndicator.momentsLater)) {
    return 'bg-[#C7E4F9]';
  } else if (text.toUpperCase().endsWith(timeIndicator.continuous)) {
    return 'bg-[#8CBCE0]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sunrise)) {
    return 'bg-[#C4DFF5]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sundown)) {
    return 'bg-[#6D9AC4]';
  } else if (text.toUpperCase().endsWith(timeIndicator.magicHour)) {
    return 'bg-[#D6B4D8]';
  } else {
    return 'bg-[#653EFF]';
  }
};

// Handle External Scene
const handleExternalScene = (text: string) => {
  if (text.toUpperCase().endsWith(timeIndicator.day)) {
    return 'bg-[#F5E8A3]';
  } else if (text.toUpperCase().endsWith(timeIndicator.night)) {
    return 'bg-[#4E4E50]';
  } else if (text.toUpperCase().endsWith(timeIndicator.afternoon)) {
    return 'bg-[#FFD86F]';
  } else if (text.toUpperCase().endsWith(timeIndicator.morning)) {
    return 'bg-[#FFE37D]';
  } else if (text.toUpperCase().endsWith(timeIndicator.evening)) {
    return 'bg-[#767577]';
  } else if (text.toUpperCase().endsWith(timeIndicator.momentsLater)) {
    return 'bg-[#FBF2C2]';
  } else if (text.toUpperCase().endsWith(timeIndicator.continuous)) {
    return 'bg-[#E5D47C]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sunrise)) {
    return 'bg-[#FAEDB2]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sundown)) {
    return 'bg-[#FFBC69]';
  } else if (text.toUpperCase().endsWith(timeIndicator.magicHour)) {
    return 'bg-[#FFA45C]';
  } else {
    return 'bg-[#653EFF]';
  }
};

// Handle Internal External Scene
const handleInternalExternalScene = (text: string) => {
  if (text.toUpperCase().endsWith(timeIndicator.day)) {
    return 'bg-[#B3B1E7]';
  } else if (text.toUpperCase().endsWith(timeIndicator.night)) {
    return 'bg-[#5F5B76]';
  } else if (text.toUpperCase().endsWith(timeIndicator.afternoon)) {
    return 'bg-[#A59EDE]';
  } else if (text.toUpperCase().endsWith(timeIndicator.morning)) {
    return 'bg-[#AFA9EB]';
  } else if (text.toUpperCase().endsWith(timeIndicator.evening)) {
    return 'bg-[#777695]';
  } else if (text.toUpperCase().endsWith(timeIndicator.momentsLater)) {
    return 'bg-[#CFCDF0]';
  } else if (text.toUpperCase().endsWith(timeIndicator.continuous)) {
    return 'bg-[#9A97D2]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sunrise)) {
    return 'bg-[#C8B9E3]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sundown)) {
    return 'bg-[#A28AB7]';
  } else if (text.toUpperCase().endsWith(timeIndicator.magicHour)) {
    return 'bg-[#E2A1C0]';
  } else {
    return 'bg-[#653EFF]';
  }
};

// Handle External Internal Scene
const handleExternalInternalScene = (text: string) => {
  if (text.toUpperCase().endsWith(timeIndicator.day)) {
    return 'bg-[#F2B8A6]';
  } else if (text.toUpperCase().endsWith(timeIndicator.night)) {
    return 'bg-[#95B39E]';
  } else if (text.toUpperCase().endsWith(timeIndicator.afternoon)) {
    return 'bg-[#F58B6E]';
  } else if (text.toUpperCase().endsWith(timeIndicator.morning)) {
    return 'bg-[#F8A98F]';
  } else if (text.toUpperCase().endsWith(timeIndicator.evening)) {
    return 'bg-[#C3DFB9]';
  } else if (text.toUpperCase().endsWith(timeIndicator.momentsLater)) {
    return 'bg-[#F8D3C8]';
  } else if (text.toUpperCase().endsWith(timeIndicator.continuous)) {
    return 'bg-[#E79D8D]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sunrise)) {
    return 'bg-[#F5C4B6]';
  } else if (text.toUpperCase().endsWith(timeIndicator.sundown)) {
    return 'bg-[#E98577]';
  } else if (text.toUpperCase().endsWith(timeIndicator.magicHour)) {
    return 'bg-[#F79A86]';
  } else {
    return 'bg-[#653EFF]';
  }
};

export const getSceneBackgroundColor = (text: string) => {
  const currentScene = text.slice(0, 3).toUpperCase();
  let bgColor = 'bg-[#653EFF]';

  if (currentScene === scenesIndicator.internal) {
    bgColor = handleInternalScene(text);
  } else if (currentScene === scenesIndicator.external) {
    bgColor = handleExternalScene(text);
  } else if (currentScene === scenesIndicator.internalExternal) {
    bgColor = handleInternalExternalScene(text);
  } else if (currentScene === scenesIndicator.externalInternal) {
    bgColor = handleExternalInternalScene(text);
  } else {
    bgColor = 'bg-[#653EFF]';
  }

  return bgColor;
};
