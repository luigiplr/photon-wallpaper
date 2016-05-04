class Themes {
  static get bing() {
    return {
      palette: {
        primary1Color: colors.grey500,
        primary2Color: colors.grey700,
        primary3Color: colors.lightBlack,
        accent1Color: colors.grey700,
        accent2Color: colors.grey100,
        accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: ColorManipulator.fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.grey500,
      }
    }
  }

  static get reddit() {
    return {
      palette: {
        primary1Color: colors.deepOrange500,
        primary2Color: colors.deepOrange700,
        primary3Color: colors.lightBlack,
        accent1Color: colors.deepOrangeA200,
        accent2Color: colors.grey100,
        accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: ColorManipulator.fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.deepOrange500,
      }
    }
  }

  static get windows_spotlight() {
    return {
      palette: {
        primary1Color: colors.blue500,
        primary2Color: colors.blue700,
        primary3Color: colors.lightBlack,
        accent1Color: colors.blueA200,
        accent2Color: colors.grey100,
        accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: ColorManipulator.fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.blue500,
      }
    }
  }
}
