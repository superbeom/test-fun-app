const resultScore = (step, round) => {
  if (step === "step_1") {
    if (round <= 4) {
      return 100;
    } else if (round > 4 && round <= 7) {
      return 80;
    } else if (round > 7 && round <= 11) {
      return 60;
    } else if (round > 11) {
      return 0;
    }
  } else if (step === "step_2") {
    if (round <= 3) {
      return 100;
    } else if (round > 3 && round <= 6) {
      return 90;
    } else if (round > 6 && round <= 9) {
      return 80;
    } else if (round > 9 && round <= 12) {
      return 70;
    } else if (round > 12 && round <= 15) {
      return 60;
    } else if (round > 15) {
      return 0;
    }
  } else if (step === "step_3") {
    if (round <= 4) {
      return 100;
    } else if (round > 4 && round <= 7) {
      return 90;
    } else if (round > 7 && round <= 10) {
      return 80;
    } else if (round > 10 && round <= 13) {
      return 70;
    } else if (round > 13 && round <= 17) {
      return 60;
    } else if (round > 17) {
      return 0;
    }
  } else if (step === "step_4") {
    if (round <= 4) {
      return 100;
    } else if (round > 4 && round <= 8) {
      return 90;
    } else if (round > 8 && round <= 12) {
      return 80;
    } else if (round > 12 && round <= 16) {
      return 70;
    } else if (round > 16 && round <= 19) {
      return 60;
    } else if (round > 19) {
      return 0;
    }
  } else if (step === "step_5") {
    if (round <= 5) {
      return 100;
    } else if (round > 5 && round <= 10) {
      return 90;
    } else if (round > 10 && round <= 15) {
      return 80;
    } else if (round > 15 && round <= 20) {
      return 70;
    } else if (round > 20 && round <= 24) {
      return 60;
    } else if (round > 24) {
      return 0;
    }
  }
};

export default (stage, round) => {
  let step;

  if (stage <= 11) {
    step = "step_1";
  } else if (stage > 11 && stage <= 40) {
    step = "step_2";
  } else if (stage > 40 && stage <= 89) {
    step = "step_3";
  } else if (stage > 89 && stage <= 105) {
    step = "step_4";
  } else if (stage > 105 && stage <= 110) {
    step = "step_5";
  }

  return resultScore(step, round);
};
