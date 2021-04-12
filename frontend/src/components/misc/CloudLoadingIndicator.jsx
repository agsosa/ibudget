/* 
  Simple animated loading indicator with a cloud icon (the arrow inside the cloud can be selected via props)

  Usage:
    <CloudLoadingIndicator />
  
  props:
    download: Display with down arrow (bool, optional)
    upload: Display with up arrow (bool, optional)

    to display without an arrow just don't set the props
*/

import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Icon } from "@mdi/react";
import { mdiCloudDownload, mdiCloud, mdiCloudUpload } from "@mdi/js";
import tw from "twin.macro";

const Text = tw.text`text-sm text-gray-800 font-semibold`;

function CloudLoadingIndicator({ download, upload }) {
  let iconPath = mdiCloud;
  if (download) iconPath = mdiCloudDownload;
  if (upload) iconPath = mdiCloudUpload;

  return (
    <>
      <motion.div
        initial={{ scale: 1.0, opacity: 0.3 }}
        animate={{ scale: 0.9, opacity: 0.8 }}
        transition={{
          yoyo: Infinity,
          duration: 1,
          ease: "easeIn",
        }}
      >
        <Icon path={iconPath} title="iBudget" size={3} color="gray" />
      </motion.div>
      <Text>Synchronizing...</Text>
    </>
  );
}

CloudLoadingIndicator.defaultProps = {
  download: false,
  upload: false,
};

CloudLoadingIndicator.propTypes = {
  download: PropTypes.bool,
  upload: PropTypes.bool,
};

export default CloudLoadingIndicator;
