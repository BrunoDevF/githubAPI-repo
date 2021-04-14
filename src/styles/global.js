import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body,#root{
    min-height: 100%;
}
body{
    background: #0d2636;
    font-size: 14px;

}
body,input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, sans-serif;
}
button {
    cursor: pointer;
}

`;




