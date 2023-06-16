import { StyleSheet, Platform } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { FontFamily } from '../../constants';

const styles = StyleSheet.create({
  labelText: {
    fontFamily: FontFamily,
    fontSize: 14,
    opacity: 0.7,
    height: 25,
  },
  dropdownLabelContainer: {
    borderWidth: 2,
    borderRadius: 2,
  },
  dropdownLabelInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  dropDownText: {
    fontFamily: FontFamily,
    fontSize: 14,
  },
  dropDownContainer: {
    // height: moderateVerticalScale(150),
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  itemContainer: {
    flex: 1,
    padding: 8,
  },
  itemText: {
    fontFamily: FontFamily,
    fontSize: 14,
  },
});

export default styles;
