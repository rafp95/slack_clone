import React from "react";
import { Progress } from "semantic-ui-react";

interface ProgressBarProps {
  precentUploaded: number;
  uploadState: boolean;
}

export const ProgressBar = ({
  precentUploaded,
  uploadState,
}: ProgressBarProps) => {
  return uploadState ? (
    <Progress
      className="progress__bar"
      progress={"percent"}
      percent={precentUploaded}
      indicating
      size="medium"
      inverted
    />
  ) : null;
};
