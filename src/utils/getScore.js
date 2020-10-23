export default (step, round) => {
  if (step === "first") {
    if (round <= 3) {
      return 100;
    } else if (round > 3 && round <= 6) {
      return 80;
    } else if (round > 6 && round <= 9) {
      return 60;
    } else if (round > 9) {
      return 0;
    }
  } else if (step === "second") {
    if (round <= 5) {
      return 100;
    } else if (round > 5 && round <= 10) {
      return 80;
    } else if (round > 10 && round <= 15) {
      return 60;
    } else if (round > 15) {
      return 0;
    }
  } else if (step === "third") {
    if (round <= 6) {
      return 100;
    } else if (round > 6 && round <= 12) {
      return 80;
    } else if (round > 12 && round <= 18) {
      return 60;
    } else if (round > 18) {
      return 0;
    }
  } else if (step === "fourth") {
    if (round <= 7) {
      return 100;
    } else if (round > 7 && round <= 14) {
      return 80;
    } else if (round > 14 && round <= 21) {
      return 60;
    } else if (round > 21) {
      return 0;
    }
  } else if (step === "fifth") {
    if (round <= 8) {
      return 100;
    } else if (round > 8 && round <= 16) {
      return 80;
    } else if (round > 16 && round <= 24) {
      return 60;
    } else if (round > 24) {
      return 0;
    }
  }
};
