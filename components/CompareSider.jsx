import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export const CompareSlider = ({ original, generatedPhoto }) => {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={original} alt="original photo" />}
      itemTwo={
        <ReactCompareSliderImage src={generatedPhoto} alt="generated photo" />
      }
      portrait={false}
      className="flex w-[600px] mt-5 h-96"
    />
  );
};
