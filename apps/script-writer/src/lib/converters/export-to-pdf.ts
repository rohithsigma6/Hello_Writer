import { jsPDF } from 'jspdf';

export const exportToPDF = (screenplayData: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  const margins = {
    left: 38.1,
    right: pageWidth - 25.4,
    top: 25.4,
    bottom: pageHeight - 25.4,
  };

  const lineHeight = 6;
  const maxLinesPerPage = Math.floor(
    (margins.bottom - margins.top) / lineHeight,
  );
  let yPosition = margins.top;
  let currentLineCount = 0;
  let pageNumber = 1;

  const addPageNumber = () => {
    if (pageNumber > 1) {
      doc.setFont('Courier', 'normal');
      doc.setFontSize(12);
      doc.text(`${pageNumber}.`, pageWidth - margins.right, pageHeight - 10, {
        align: 'right',
      });
    }
  };

  const checkPageBreak = () => {
    if (
      currentLineCount >= maxLinesPerPage ||
      yPosition + lineHeight > margins.bottom
    ) {
      doc.addPage();
      pageNumber++;
      yPosition = margins.top;
      currentLineCount = 0;
      addPageNumber();
    }
  };

  const addText = (text: any, fontSize: any, x: any, isBold = false) => {
    checkPageBreak();
    doc.setFont('Courier', isBold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    doc.text(text, x, yPosition);
    yPosition += lineHeight;
    currentLineCount++;
  };

  const splitText = (text: any, width: any) => doc.splitTextToSize(text, width);

  const addSceneHeading = (text: any) =>
    addText(text.toUpperCase(), 12, margins.left, true);
  const addAction = (text: any) => {
    const wrappedText = splitText(text, margins.right - margins.left);
    wrappedText.forEach((line: any) => addText(line, 12, margins.left));
  };
  const addCharacter = (text: any) =>
    addText(text.toUpperCase(), 12, 93.98, true);
  const addDialogue = (text: any) => {
    const maxWidth = 76.2;
    const xStart = 63.5;
    const wrappedText = splitText(text, maxWidth);
    wrappedText.forEach((line: any) => addText(line, 12, xStart));
  };

  const addParenthetical = (text: any) => addText(`${text}`, 12, 55.88);

  screenplayData.content.forEach((item: any) => {
    item.content[0].content.forEach((childItem: any) => {
      const typeClass = childItem.attrs?.class;
      const text = childItem.content?.map((c: any) => c.text).join(' ') || '';

      if (typeClass === 'scene') addSceneHeading(text);
      else if (typeClass === 'action') addAction(text);
      else if (typeClass === 'character') addCharacter(text);
      else if (typeClass === 'dialogue') addDialogue(text);
      else if (typeClass === 'parenthetical') addParenthetical(text);
    });
  });

  addPageNumber();
  doc.save('screenplay.pdf');
};
