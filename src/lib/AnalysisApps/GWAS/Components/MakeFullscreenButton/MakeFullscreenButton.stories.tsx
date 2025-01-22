import React from 'react';
import MakeFullscreenButton from './MakeFullscreenButton';
import FullscreenSelectors from './FullscreenSelectors';

export default {
  title: 'GWASApp/MakeFullScreenButton',
  component: MakeFullscreenButton,
};

const Template = ({}) => {
  const totalCombinationsRGB = 16777215;
  const randomBorder = () => {
    return {
      border: '3px solid',
      borderColor:
        '#' + Math.floor(Math.random() * totalCombinationsRGB).toString(16),
    };
  };
  return (
    <>
      <div>
        {FullscreenSelectors.map((selectorString, iterator) => (
          <>
            {iterator === 0 && (
              <h3 className={selectorString.replace('.', '')}>
                Selectors to be Hidden and Shown to Make Full Screen:
              </h3>
            )}
            <hr />
            {selectorString === 'header' && (
              <header style={randomBorder()}>Header Element</header>
            )}
            {selectorString === 'footer' && (
              <footer style={randomBorder()}>Footer Element</footer>
            )}
            {selectorString !== 'footer' && selectorString !== 'header' && (
              <div
                className={selectorString.replace('.', '')}
                style={randomBorder()}
              >
                {selectorString}
              </div>
            )}
          </>
        ))}
        <br />
      </div>
      <MakeFullscreenButton />
    </>
  );
};

export const SuccessState = Template.bind({});
