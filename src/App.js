import { useState } from "react";
import "./App.css";
import Chatbox from "./components/Chatbox";

function App() {
  const [active, setActive] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {active ? <Chatbox setActive={setActive} /> : null}
        <div
          className="widget-icon"
          onClick={() => {
            setActive(!active);
          }}
        >
          <svg
            width="74"
            height="74"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_624_14615)">
              <circle
                cx="37"
                cy="37"
                r="30"
                fill="#E52A2B"
                fill-opacity="0.15"
              />
            </g>
            <circle cx="36.9999" cy="37.0002" r="24.1936" fill="#E52A2B" />
            <g clip-path="url(#clip0_624_14615)">
              <path
                d="M26.0324 33.9286C26.0318 33.0391 26.2067 32.1583 26.547 31.3365C26.8873 30.5147 27.3864 29.7682 28.0156 29.1395C28.6449 28.5109 29.3919 28.0126 30.214 27.6731C31.0362 27.3336 31.9172 27.1597 32.8066 27.1611H41.8389C45.5793 27.1611 48.6131 30.2039 48.6131 33.9286V47.4837H32.8066C29.0661 47.4837 26.0324 44.441 26.0324 40.7163V33.9286ZM46.355 45.2257V33.9286C46.352 32.7324 45.875 31.5861 45.0285 30.7409C44.1821 29.8957 43.0351 29.4204 41.8389 29.4192H32.8066C32.2137 29.4177 31.6263 29.5333 31.0782 29.7593C30.53 29.9853 30.0319 30.3173 29.6123 30.7362C29.1927 31.1552 28.86 31.6528 28.6332 32.2006C28.4063 32.7484 28.2899 33.3356 28.2905 33.9286V40.7163C28.2935 41.9125 28.7704 43.0588 29.6169 43.904C30.4634 44.7492 31.6104 45.2245 32.8066 45.2257H46.355ZM39.5808 36.1934H41.8389V38.4515H39.5808V36.1934ZM32.8066 36.1934H35.0647V38.4515H32.8066V36.1934Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_624_14615"
                x="0"
                y="0"
                width="74"
                height="74"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="3.5"
                  result="effect1_foregroundBlur_624_14615"
                />
              </filter>
              <clipPath id="clip0_624_14615">
                <rect
                  width="27.0968"
                  height="27.0968"
                  fill="white"
                  transform="translate(23.7742 23.7739)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </header>
    </div>
  );
}

export default App;
