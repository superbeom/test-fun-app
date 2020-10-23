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
    if (round <= 4) {
      return 100;
    } else if (round > 4 && round <= 7) {
      return 80;
    } else if (round > 7 && round <= 11) {
      return 60;
    } else if (round > 11) {
      return 0;
    }
  } else if (step === "step_3") {
    if (round <= 4) {
      return 100;
    } else if (round > 4 && round <= 7) {
      return 80;
    } else if (round > 7 && round <= 11) {
      return 60;
    } else if (round > 11) {
      return 0;
    }
  } else if (step === "step_4") {
    if (round <= 6) {
      return 100;
    } else if (round > 6 && round <= 11) {
      return 80;
    } else if (round > 11 && round <= 16) {
      return 60;
    } else if (round > 16) {
      return 0;
    }
  } else if (step === "step_5") {
    if (round <= 6) {
      return 100;
    } else if (round > 6 && round <= 11) {
      return 80;
    } else if (round > 11 && round <= 16) {
      return 60;
    } else if (round > 16) {
      return 0;
    }
  } else if (step === "step_6") {
    if (round <= 6) {
      return 100;
    } else if (round > 6 && round <= 11) {
      return 80;
    } else if (round > 11 && round <= 16) {
      return 60;
    } else if (round > 16) {
      return 0;
    }
  } else if (step === "step_7") {
    if (round <= 9) {
      return 100;
    } else if (round > 9 && round <= 14) {
      return 80;
    } else if (round > 14 && round <= 19) {
      return 60;
    } else if (round > 19) {
      return 0;
    }
  } else if (step === "step_8") {
    if (round <= 9) {
      return 100;
    } else if (round > 9 && round <= 14) {
      return 80;
    } else if (round > 14 && round <= 19) {
      return 60;
    } else if (round > 19) {
      return 0;
    }
  } else if (step === "step_9") {
    if (round <= 9) {
      return 100;
    } else if (round > 9 && round <= 14) {
      return 80;
    } else if (round > 14 && round <= 19) {
      return 60;
    } else if (round > 19) {
      return 0;
    }
  } else if (step === "step_10") {
    if (round <= 12) {
      return 100;
    } else if (round > 12 && round <= 17) {
      return 80;
    } else if (round > 17 && round <= 22) {
      return 60;
    } else if (round > 22) {
      return 0;
    }
  } else if (step === "step_11") {
    if (round <= 12) {
      return 100;
    } else if (round > 12 && round <= 17) {
      return 80;
    } else if (round > 17 && round <= 22) {
      return 60;
    } else if (round > 22) {
      return 0;
    }
  } else if (step === "step_12") {
    if (round <= 12) {
      return 100;
    } else if (round > 12 && round <= 17) {
      return 80;
    } else if (round > 17 && round <= 22) {
      return 60;
    } else if (round > 22) {
      return 0;
    }
  }
};

export default (stage, round) => {
  let step;

  if (stage <= 11) {
    step = "step_1";
  } else if (stage > 11 && stage <= 30) {
    step = "step_2";
  } else if (stage > 30 && stage <= 40) {
    step = "step_3";
  } else if (stage > 40 && stage <= 50) {
    step = "step_4";
  } else if (stage > 50 && stage <= 65) {
    step = "step_5";
  } else if (stage > 65 && stage <= 77) {
    step = "step_6";
  } else if (stage > 77 && stage <= 83) {
    step = "step_7";
  } else if (stage > 83 && stage <= 89) {
    step = "step_8";
  } else if (stage > 89 && stage <= 94) {
    step = "step_9";
  } else if (stage > 94 && stage <= 98) {
    step = "step_10";
  } else if (stage > 98 && stage <= 105) {
    step = "step_11";
  } else if (stage > 105 && stage <= 110) {
    step = "step_12";
  }

  return resultScore(step, round);
};
