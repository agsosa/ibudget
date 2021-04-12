/* 
  Simple component to indicate empty status

  Usage:
    <NoDataIndicator />
  
  props:
    smaller: boolean to indicate if the main icon should be smaller
*/

import { Icon } from "@mdi/react";
import { mdiCloudSearchOutline, mdiEmoticonExcitedOutline } from "@mdi/js";
import tw from "twin.macro";
import PropTypes from "prop-types";

/* Start styled components */

const MainText = tw.text`text-base`;
const SecondaryText = tw.text`text-sm  flex flex-row justify-center gap-1`;
const MainContainer = tw.div`flex justify-center `;
const Container = tw.div`flex flex-col text-center justify-center opacity-50 transform hover:scale-105 hover:opacity-75 transition-all duration-500`;
const CustomIcon = tw(Icon)` self-center `;

/* End styled components */

function NoDataIndicator({ smaller }) {
  return (
    <MainContainer>
      <Container>
        <CustomIcon
          path={mdiCloudSearchOutline}
          title="iBudget"
          size={smaller ? 2 : 4}
          color="gray"
        />
        <MainText>Nothing to show here</MainText>
        <SecondaryText>
          Try adding more transactions
          <CustomIcon
            path={mdiEmoticonExcitedOutline}
            title="iBudget"
            size={0.85}
            color="gray"
          />
        </SecondaryText>
      </Container>
    </MainContainer>
  );
}

NoDataIndicator.defaultProps = {
  smaller: false,
};

NoDataIndicator.propTypes = {
  smaller: PropTypes.bool,
};

export default NoDataIndicator;
