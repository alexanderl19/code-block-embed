// Seperate file so Svelte doesn't parse style tag in string literal.

const generateStyleTag = (highlightedLine: number) =>
	`
    <style lang="scss">
      .hljs tr:nth-of-type(${highlightedLine + 1}) {
        opacity: 1;
        filter: saturate(1);
      }
    </style>
  `;

export default generateStyleTag;
