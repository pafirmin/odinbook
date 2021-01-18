import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.mainFontColour};
  background-color: ${(props) => props.theme.bodyBg};
  height: 100vh;
  line-height: 1.3rem;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
  font: inherit;
  color: inherit;
}
a:visited {
  font: inherit;
  color: inherit;
}
h2 {
  font-size: 1.4rem;
}
h4 {
  font-weight: 900;
}
* {
  box-sizing: border-box;
  transition: background 0.30s linear, color 0.50s linear;;
}
*:focus {
  outline: none;
}

.main-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: rgb(62, 133, 209);
  color: #fff;
  padding: 12px;
  height: 60px;
  z-index: 2;
}

.main-title {
  font-size: 2rem;
  font-weight: 900;
  flex: 1;
}

.main-wrapper {
  margin: 12px auto;
  width: 1100px;
  min-height: 100vh;
}

.user-form {
  background-color: ${(props) => props.theme.cardBg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  gap: 1.5rem;
  margin: auto;
  padding: 32px;
  border-radius: 40px;
  box-shadow: 0px 1px 2px ${(props) => props.theme.shadowColour};
}

.form-header {
  text-align: center;
  line-height: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-form .user-name {
  display: flex;
  justify-content: space-between;
}

.form-group.name {
  width: 48%;
}

.thumbnail {
  object-fit: cover;
  width: 50px;
  height: 50px;
  box-shadow: 0px 0px 1px ${(props) => props.theme.shadowColour};
}

.thumbnail.tiny {
  width: 20px;
  height: 20px;
}

.thumbnail.small {
  width: 40px;
  height: 40px;
}

.thumbnail.large {
  width: 90px;
  height: 90px;
  border-radius: 6px;
}

.round {
  border-radius: 50%;
}

.bold {
  font-weight: 900;
}

.card {
  padding: 0.8rem;
  background: ${(props) => props.theme.cardBg};
  border-radius: 8px;
  box-shadow: 0px 1px 2px ${(props) => props.theme.shadowColour};
}

@media screen and (max-width: 1200px) {
  .main-wrapper {
    width: 100%;
  }
  .user-form {
    width: 100%;
  }
}
`;

export default GlobalStyle;
