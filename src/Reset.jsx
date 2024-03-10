import { css } from '@emotion/react';

const Reset = css`
  * {
    padding: 0;
    margin: 0;
    overflow-wrap: break-word;
    box-sizing: border-box;
  }
  p {
    margin-bottom: 0;
  }
  ,
  ol,
  ul {
    padding: 0;
  }
  li {
    list-style: none;
  }
`;

export default Reset;
