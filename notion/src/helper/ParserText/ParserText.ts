export const parserText = (text: string) => {
    const parser = new DOMParser();

    const textDOM = parser.parseFromString(text, "text/html");

    return textDOM.body.textContent?.trim();
};
